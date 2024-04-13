import { APIInteraction } from 'discord-api-types/v10'
import { ALGORITHM, SIGNATURE_HEADER, TIMESTAMP_HEADER } from './constants'
import { BotEnv } from './env'

const encoder = new TextEncoder()

function hexToBin(hex: string) {
  const buffer = new Uint8Array(Math.ceil(hex.length / 2))

  for (let i = 0; i < buffer.length; i++) {
		buffer[i] = parseInt(hex.substr(i * 2, 2), 16);
  }

  return buffer
}

export async function getInteraction(request: Request, env: BotEnv) {
  if (request.method !== 'POST') {
    return
  }

  const signature = request.headers.get(SIGNATURE_HEADER),
    timestamp = request.headers.get(TIMESTAMP_HEADER)

  if (signature === null || timestamp === null) {
    return
  }

  const [body, key] = await Promise.all([
    request.text(),
    crypto.subtle.importKey(
      'raw',
      hexToBin(env.DISCORD_PUBLIC_KEY),
      { name: ALGORITHM },
      false,
      ['verify']
    ),
  ])

  const ok = await crypto.subtle.verify(
    ALGORITHM,
    key,
    hexToBin(signature),
    encoder.encode(timestamp + body)
  )

  if (!ok) {
    return
  }

  return JSON.parse(body) as APIInteraction
}
