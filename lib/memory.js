const memory = {}

export function getMemory(jid) {
  return memory[jid] || []
}

export function addMemory(jid, role, text) {
  if (!memory[jid]) memory[jid] = []
  memory[jid].push({ role, text })

  if (memory[jid].length > 10) {
    memory[jid].shift()
  }
}