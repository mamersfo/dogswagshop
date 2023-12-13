import { orderMachine } from './machine'
import { createActor } from 'xstate'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import type { OrderEvent } from './machine'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export const send = async (
    id: string,
    event: OrderEvent,
    supabase?: SupabaseClient<Database>
) => {
    if (!supabase) {
        const cookieStore = cookies()
        supabase = createClient(cookieStore)
    }

    const { data, error } = await supabase
        .from('orders')
        .select('state')
        .eq('id', id)
        .maybeSingle()

    if (error) {
        return { data: null, error }
    }

    // recreate actor and send paymentReceived event
    const actor = createActor(orderMachine, data as any).start()
    actor.send(event)
    let state = actor.getPersistedSnapshot() as any

    // update order
    return await supabase
        .from('orders')
        .update({
            state,
            status: state.value,
        })
        .eq('id', id)
        .select()
        .maybeSingle()
}
