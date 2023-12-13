import { z } from 'zod'
import { eventTrigger } from '@trigger.dev/sdk'
import { Supabase } from '@trigger.dev/supabase'

import { client } from '@/trigger'
import { Database } from '@/types/supabase'
import { send } from '@/lib/order/index'

import type { OrderEvent } from '@/lib/order/machine'

const supabase = new Supabase<Database>({
    id: 'supabase',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
})

export const processOrderEvent = client.defineJob({
    id: 'process-order-event',
    name: 'Process Order Event',
    version: '0.0.1',
    trigger: eventTrigger({
        name: 'order.event',
        schema: z.object({
            id: z.string(),
            event: z.custom<OrderEvent>(),
        }),
    }),
    integrations: {
        supabase,
    },
    run: async (payload, io, ctx) => {
        const { data: order, error } = await io.supabase.runTask(
            'update-order',
            async (supabase) => {
                return await send(payload.id, payload.event, supabase)
            },
            {
                name: 'Process order event',
                icon: 'supabase',
            }
        )

        if (error) throw error

        await io.logger.error(`result: ${order}`)
    },
})
