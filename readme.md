# `@oddyamill/discord-workers`
Discord 🥰 Cloudflare Workers

```typescript
import { respond, getInteraction, BotEnv } from '@oddyamill/discord-workers'
import { InteractionResponseType, InteractionType } from 'discord-api-types/v10'

export default {
  async fetch(request: Request, env: BotEnv) {
    const interaction = await getInteraction(request, env)

    if (interaction === undefined) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (interaction.type === InteractionType.Ping) {
      return respond(InteractionResponseType.Pong, undefined)
    }

    return respond(InteractionResponseType.ChannelMessageWithSource, {
      content: 'Hi!',
    })
  },
}
```
