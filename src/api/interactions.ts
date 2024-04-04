import {
  APIInteraction,
  InteractionResponseType,
  RESTPatchAPIInteractionOriginalResponseJSONBody,
  RESTPatchAPIInteractionOriginalResponseResult,
  Routes,
} from 'discord-api-types/v10'
import { RespondData } from './types/RespondData'
import { request } from '../request'

export function respond<T extends InteractionResponseType>(
  type: T,
  data: RespondData[T]
) {
  return Response.json({ type, data })
}

export function editResponse(
  interaction: APIInteraction,
  data: RESTPatchAPIInteractionOriginalResponseJSONBody | FormData
) {
  const init: RequestInit = {
    method: 'PATCH',
  }

  if (data instanceof FormData) {
    init.body = data
  } else {
    init.headers = { 'Content-Type': 'application/json' }
    init.body = JSON.stringify(data)
  }

  return request<RESTPatchAPIInteractionOriginalResponseResult>(
    Routes.webhookMessage(interaction.application_id, interaction.token),
    init
  )
}
