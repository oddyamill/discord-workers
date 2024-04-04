import {
  RESTPutAPICurrentUserApplicationRoleConnectionJSONBody,
  RESTPutAPICurrentUserApplicationRoleConnectionResult,
  Routes,
} from 'discord-api-types/v10'
import { request } from '../request'
import { OauthEnv } from '../env'

export async function updateMetadata(
  env: OauthEnv,
  token: string,
  metadata: RESTPutAPICurrentUserApplicationRoleConnectionJSONBody
) {
  return request<RESTPutAPICurrentUserApplicationRoleConnectionResult>(
    Routes.userApplicationRoleConnection(env.DISCORD_CLIENT_ID),
    {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    }
  )
}
