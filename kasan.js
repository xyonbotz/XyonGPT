// ===============================
// XYON-GPT 1.0
// ===============================

// WAJIB NODE 18+
import crypto from 'crypto'
globalThis.crypto = crypto.webcrypto

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import baileys from '@whiskeysockets/baileys'
import pino from 'pino'
import readline from 'readline'

import { askAI } from './lib/ai.js'
import { getMemory, addMemory } from './lib/memory.js'
import { shouldReplyGroup } from './lib/group.js'
import { isSpam, safeText } from './lib/filter.js'

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = baileys

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (q) => new Promise(res => rl.question(q, res))

async function startBot () {
  const { state, saveCreds } = await useMultiFileAuthState('./sessions')
  const { version } = await fetchLatestBaileysVersion()

  const conn = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: ['XYONBOTZ', 'Chrome', '1.0.0'],
    version,
    printQRInTerminal: false
  })

  // ===============================
  // PAIRING CODE 
  // ===============================
  if (!conn.authState.creds.registered) {
    let phoneNumber = ''

    do {
      phoneNumber = await question('MASUKIN NOMOR WA (628xxxx): ')
      phoneNumber = phoneNumber.replace(/\D/g, '')
    } while (!/^\d{10,15}$/.test(phoneNumber))

    rl.close()
    console.log('\n⏳ Generating pairing code...\n')

    setTimeout(async () => {
      try {
        const code = await conn.requestPairingCode(phoneNumber)
        console.log('==============================')
        console.log('PAIRING CODE :', code.match(/.{1,4}/g).join('-'))
        console.log('==============================\n')
      } catch (e) {
        console.error('❌ GAGAL PAIRING')
        console.error(e)
      }
    }, 3000)
  }

  // ===============================
  // CONNECTION STATUS
  // ===============================
  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'open') {
      console.log('✅ BOT CONNECTED KE WHATSAPP')
    }

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode
      console.log('❌ DISCONNECTED:', code)

      if (code !== DisconnectReason.loggedOut) {
        startBot()
      } else {
        console.log('⚠️ LOGOUT, HAPUS folder sessions/')
      }
    }
  })

  conn.ev.on('creds.update', saveCreds)

  // ===============================
  // NGETES
  // ===============================
  conn.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg?.message || msg.key.fromMe) return

    const from = msg.key.remoteJid
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text

    if (!text) return
    if (isSpam(from)) return
    if (!safeText(text)) return
    if (!shouldReplyGroup(msg, conn.user.id)) return

    addMemory(from, 'user', text)

    const history = getMemory(from)
      .map(m => `${m.role}: ${m.text}`)
      .join('\n')

    const answer = await askAI(history)
    addMemory(from, 'assistant', answer)

    await conn.sendMessage(from, { text: answer })
  })
}

startBot()
