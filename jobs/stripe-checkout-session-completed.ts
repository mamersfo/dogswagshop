import { client } from '@/trigger'
import { Stripe } from '@trigger.dev/stripe'
import { Supabase } from '@trigger.dev/supabase'
import { retrieveCheckoutSession } from '@/utils/stripe'
import { Database } from '@/types/supabase'
import { send } from '@/lib/order'

const stripe = new Stripe({
    id: 'stripe',
    apiKey: process.env.STRIPE_SECRET_KEY!,
})

const supabase = new Supabase<Database>({
    id: 'supabase',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
})

client.defineJob({
    id: 'stripe-checkout-session-completed',
    name: 'Stripe Checkout Session Completed',
    version: '0.1.0',
    trigger: stripe.onCheckoutSessionCompleted(),
    integrations: {
        stripe,
        supabase,
    },
    run: async (payload, io, ctx) => {
        const stripeInfo = await io.runTask(
            'retrieve-checkout-session',
            async () => {
                return retrieveCheckoutSession(payload.id)
            },
            {
                name: 'Retrieve Checkout Session',
                icon: 'stripe',
            }
        )

        const { data: order, error } = await io.supabase.runTask(
            'send-payment-order-event',
            async (supabase) => {
                return send(
                    stripeInfo.id,
                    {
                        type: 'payment',
                        info: stripeInfo,
                    },
                    supabase
                )
            },
            {
                name: 'Send order event',
                icon: 'supabase',
            }
        )
    },
})
