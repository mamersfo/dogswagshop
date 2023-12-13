import { z } from 'zod'
import { client } from '@/trigger'
import { SendGrid } from '@trigger.dev/sendgrid'
import { eventTrigger } from '@trigger.dev/sdk'
import { renderAsync } from '@react-email/render'
import { createElement } from 'react'
import { OrderConfirmationEmail } from '@/app/components/email'
import { OrderContext } from '@/lib/order/machine'
import { ShipmentNotificationEmail } from '@/app/components/email/shipment-notification-email'

const sendgrid = new SendGrid({
    id: 'sendgrid',
    apiKey: process.env.SENDGRID_API_KEY!,
})

export const sendEmailJob = client.defineJob({
    id: 'send-email',
    name: 'Send Email',
    version: '0.1.0',
    trigger: eventTrigger({
        name: 'send.email',
        schema: z.object({
            type: z.enum(['order-confirmation', 'shipment-notification']),
            recipient: z.string(),
            subject: z.string(),
            context: z.custom<OrderContext>(),
        }),
    }),
    integrations: {
        sendgrid,
    },
    run: async (payload, io, ctx) => {
        let emailTemplate: ({
            context,
        }: {
            context: OrderContext
        }) => React.JSX.Element

        switch (payload.type) {
            case 'order-confirmation':
                emailTemplate = OrderConfirmationEmail
                break
            case 'shipment-notification':
                emailTemplate = ShipmentNotificationEmail
                break
            default:
                break
        }

        const html = await io.runTask('generate-html', async (task) =>
            renderAsync(
                createElement(emailTemplate, { context: payload.context })
            )
        )

        await io.sendgrid.sendEmail(payload.type, {
            to: payload.recipient,
            from: SENDER,
            subject: payload.subject,
            html,
        })
    },
})

const SENDER = 'Martin van Amersfoorth <martin.van.amersfoorth@finalist.nl>'
