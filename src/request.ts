import { RouteBases } from 'discord-api-types/v10'

export async function request<T>(pathname: string, init?: RequestInit) {
  const response = await fetch(RouteBases.api + pathname, init)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as T
}
