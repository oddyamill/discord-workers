import {
  Routes,
  RESTPostAPIApplicationEmojiJSONBody,
  RESTPostAPIApplicationEmojiResult,
  RESTPatchAPIApplicationEmojiJSONBody,
  RESTPatchAPIApplicationEmojiResult,
  RESTGetAPIApplicationEmojiResult,
  RESTGetAPIApplicationEmojisResult,
  RESTDeleteAPIApplicationEmojiResult,
} from 'discord-api-types/v10'
import { BotEnv } from '../env'
import { requestWithAuth } from '../request'

export function createApplicationEmoji(
  env: BotEnv,
  applicationId: string,
  name: string,
  image: string
) {
  const data: RESTPostAPIApplicationEmojiJSONBody = {
    name,
    image,
  }

  return requestWithAuth<RESTPostAPIApplicationEmojiResult>(
    env,
    Routes.applicationEmojis(applicationId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
}

export function getApplicationEmojis(env: BotEnv, applicationId: string) {
  return requestWithAuth<RESTGetAPIApplicationEmojisResult>(
    env,
    Routes.applicationEmojis(applicationId)
  )
}

export function getApplicationEmoji(
  env: BotEnv,
  applicationId: string,
  emojiId: string
) {
  return requestWithAuth<RESTGetAPIApplicationEmojiResult>(
    env,
    Routes.applicationEmoji(applicationId, emojiId)
  )
}

export function editApplicationEmoji(
  env: BotEnv,
  applicationId: string,
  emojiId: string,
  name: string
) {
  const data: RESTPatchAPIApplicationEmojiJSONBody = {
    name,
  }

  return requestWithAuth<RESTPatchAPIApplicationEmojiResult>(
    env,
    Routes.applicationEmoji(applicationId, emojiId),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
}

export function deleteApplicationEmoji(
  env: BotEnv,
  applicationId: string,
  emojiId: string
) {
  return requestWithAuth<RESTDeleteAPIApplicationEmojiResult>(
    env,
    Routes.applicationEmoji(applicationId, emojiId),
    {
      method: 'DELETE',
      noResponse: true,
    }
  )
}
