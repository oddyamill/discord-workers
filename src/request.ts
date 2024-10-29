import { RouteBases } from 'discord-api-types/v10'
import { BotEnv } from './env'

export interface Init extends RequestInit {
  void?: boolean
}

export type URLBuilder = (pathname: string) => string

let buildURL: URLBuilder = (pathname: string) => {
  return RouteBases.api + pathname
}

export function setURLBuilder(builder: URLBuilder) {
  buildURL = builder
}

export async function request<T>(pathname: string, init: Init = {}) {
  const response = await fetch(buildURL(pathname), {
    ...init,
    headers: {
      'User-Agent': 'DiscordBot (https://github.com/oddyamill/discord-workers, 0.0.0)',
      ...(init.headers ?? {}),
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  if (init.void) {
    return undefined as T
  }

  return response.json() as T
}

export async function requestWithAuth<T>(env: BotEnv, pathname: string, init: Init = {}) {
  const auth = env.DISCORD_TOKEN.startsWith('Bot ') ? env.DISCORD_TOKEN : `Bot ${env.DISCORD_TOKEN}`

  return request<T>(pathname, {
    ...init,
    headers: { Authorization: auth, ...(init.headers ?? {}) },
  })
}
