import fetch from 'node-fetch'

export async function askAI(prompt) {
  const res = await fetch('https://xyongpt.my.id/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  })

  const json = await res.json()
  return json?.data?.answer || 'AI tidak merespon.'
}