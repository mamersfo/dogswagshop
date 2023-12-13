import { client } from '@/trigger'
import { invokeTrigger } from '@trigger.dev/sdk'
import { Supabase } from '@trigger.dev/supabase'
import { Database } from '@/types/supabase'
import { send } from '@/lib/order'

const supabase = new Supabase<Database>({
    id: 'supabase',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
})

client.defineJob({
    id: 'delivery-notification',
    name: 'Delivery Notification from Carrier',
    version: '0.1.0',
    trigger: invokeTrigger(),
    integrations: {
        supabase,
    },
    run: async (payload, io, ctx) => {
        const { data: order, error } = await io.supabase.runTask(
            'send-delivery-order-event',
            async (supabase) => {
                return send(
                    payload.id,
                    {
                        type: 'delivery',
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
