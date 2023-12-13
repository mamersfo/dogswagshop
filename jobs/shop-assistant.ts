import { z } from 'zod'
import { client } from '@/trigger'
import { OpenAI } from '@trigger.dev/openai'
import { eventTrigger } from '@trigger.dev/sdk'

const openai = new OpenAI({
    id: 'openai',
    apiKey: process.env.OPENAI_API_KEY!,
})

export const shopAssistant = client.defineJob({
    id: 'shop-assistant',
    name: 'Shop Assistant',
    version: '0.1.0',
    trigger: eventTrigger({
        name: 'run.shop.assistant',
        schema: z.object({
            threadId: z.string().optional(),
            message: z.string(),
        }),
    }),
    integrations: {
        openai,
    },
    run: async (payload, io) => {
        const assistant_id = 'asst_Zc2OECoMO6rav94ECn8otpMs'

        let thread

        if (payload.threadId) {
            thread = await io.openai.beta.threads.retrieve(
                'retrieve-thread',
                payload.threadId
            )

            const message = await io.openai.beta.threads.messages.create(
                'create-message',
                payload.threadId,
                {
                    role: 'user',
                    content: payload.message,
                }
            )
        } else {
            thread = await io.openai.beta.threads.create('create-thread', {
                messages: [
                    {
                        role: 'user',
                        content: payload.message,
                    },
                ],
            })
        }

        const run =
            await io.openai.beta.threads.runs.createAndWaitForCompletion(
                'create-run',
                thread.id,
                {
                    assistant_id,
                }
            )

        if (run.status !== 'completed') {
            throw new Error(
                `Run finished with status ${run.status}: ${JSON.stringify(
                    run.last_error
                )}`
            )
        }

        // List all messages in the thread
        const messages = await io.openai.beta.threads.messages.list(
            'list-messages',
            run.thread_id
        )

        return {
            threadId: thread.id,
            messages,
        }
    },
})
