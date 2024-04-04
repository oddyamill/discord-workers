import {
  Routes,
  RESTPostOAuth2AccessTokenResult,
  RESTPostOAuth2AccessTokenURLEncodedData,
  RESTPostOAuth2RefreshTokenURLEncodedData,
  RESTPostOAuth2RefreshTokenResult,
} from 'discord-api-types/v10'
import { OauthEnv } from '../env'
import { request } from '../request'

export function getAccessToken(
  env: OauthEnv,
  url: URL,
) {
  const code = url.searchParams.get('code')!,
    redirect_uri = url.origin + url.pathname

  const data: RESTPostOAuth2AccessTokenURLEncodedData = {
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri,
    code,
  }

  return request<RESTPostOAuth2AccessTokenResult>(
    Routes.oauth2TokenExchange(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data as any),
    }
  )
}

export function refreshAccessToken(env: OauthEnv, refreshToken: string) {
  const data: RESTPostOAuth2RefreshTokenURLEncodedData = {
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }

  return request<RESTPostOAuth2RefreshTokenResult>(
    Routes.oauth2TokenExchange(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data as any),
    }
  )
}
