import { RouteBases } from 'discord-api-types/v10'

export async function request<T>(pathname: string, init: RequestInit = {}) {
  const response = await fetch(RouteBases.api + pathname, {
    ...init,
    headers: {
      'User-Agent': 'DiscordBot (https://github.com/oddyamill/discord-workers, 0.0.0)',
      ...(init.headers ?? {}),
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as T
}
