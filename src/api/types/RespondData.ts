import {
  APIApplicationCommandAutocompleteResponse,
  APIInteractionResponseChannelMessageWithSource,
  APIInteractionResponseDeferredChannelMessageWithSource,
  APIInteractionResponseUpdateMessage,
  APIModalInteractionResponse,
  InteractionResponseType,
} from 'discord-api-types/v10'

export type RespondData = {
  [InteractionResponseType.Pong]: undefined
  [InteractionResponseType.ChannelMessageWithSource]: APIInteractionResponseChannelMessageWithSource['data']
  [InteractionResponseType.DeferredChannelMessageWithSource]: APIInteractionResponseDeferredChannelMessageWithSource['data']
  [InteractionResponseType.DeferredMessageUpdate]: undefined
  [InteractionResponseType.UpdateMessage]: APIInteractionResponseUpdateMessage['data']
  [InteractionResponseType.ApplicationCommandAutocompleteResult]: APIApplicationCommandAutocompleteResponse['data']
  [InteractionResponseType.Modal]: APIModalInteractionResponse['data']
  [InteractionResponseType.PremiumRequired]: undefined
}
