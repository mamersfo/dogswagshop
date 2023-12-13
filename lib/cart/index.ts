import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { cartMachine } from '@/lib/cart/machine'
import { Snapshot, createActor } from 'xstate'

export const send = async (payload: any) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
        throw userError
    }

    if (!user?.id) return

    const { data: cart, error: fetchError } = await supabase
        .from('carts')
        .select('user_id, state')
        .maybeSingle()

    if (fetchError) {
        throw fetchError
    }

    let actor: any

    if (cart?.state) {
        try {
            actor = createActor(cartMachine, {
                snapshot: cart.state as Snapshot<any>,
            })
        } catch (e) {
            throw new Error(
                `Error creating actor from state: ${(e as Error).message}`
            )
        }
    } else {
        actor = createActor(cartMachine)
    }

    let actorError = null
    let value = null

    actor.subscribe({
        async next(snapshot: any) {
            value = snapshot.value
        },
        async error(error: any) {
            actorError = error
        },
        async complete() {
            const { error: upsertError } = await supabase.from('carts').upsert({
                user_id: user.id,
                state: actor.getPersistedSnapshot(),
            })

            if (upsertError) {
                actorError = upsertError
            }
        },
    })

    actor.start()
    actor.send(payload)
    actor.stop()

    if (actorError) {
        throw new Error(`send() - error: ${(actorError as Error).message}`)
    }

    return value
}
