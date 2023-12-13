import { z } from 'zod'
import { client } from '@/trigger'
import { Slack } from '@trigger.dev/slack'
import { eventTrigger } from '@trigger.dev/sdk'

const slack = new Slack({
    id: 'dogswagshop',
})

export const sendTextMessageJob = client.defineJob({
    id: 'send-text-message',
    name: 'Send Text Message',
    version: '0.1.0',
    trigger: eventTrigger({
        name: 'send.text.message',
        schema: z.object({
            text: z.string(),
        }),
    }),
    integrations: {
        slack,
    },
    run: async (payload, io, ctx) => {
        const response = await io.slack.postMessage('Post Slack message', {
            channel: 'dogswagshop',
            text: payload.text,
        })
    },
})
