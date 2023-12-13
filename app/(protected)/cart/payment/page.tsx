import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import type { Stripe } from 'stripe'
import { stripe } from '@/utils/stripe'
import { send } from '@/lib/cart'
import { Debug } from '@/app/components'
import Celebration from './celebration'

export default async function Page({
    searchParams: { session_id },
}: {
    searchParams: { session_id: string }
}) {
    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent'],
        })

    if (
        (checkoutSession?.payment_intent as Stripe.PaymentIntent)?.status ===
        'succeeded'
    ) {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        if (checkoutSession.client_reference_id) {
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .select('order_id')
                .eq('id', checkoutSession.client_reference_id)
                .select()
                .maybeSingle()

            if (orderError) {
                throw orderError
            }

            send({ type: 'resetCart' })

            return (
                <div className='flex flex-col gap-4 mt-8'>
                    <Celebration />
                    <div className='uppercase text-lg font-semibold'>
                        {`order #${order?.number} confirmed!`}
                    </div>
                    <div>
                        We have received your order. It will be shipped as soon
                        as possible. Please monitor your e-mail in order to
                        follow your package.
                    </div>
                    <Link href='/shop' className='mt-4 text-sm underline'>
                        Back to shop
                    </Link>
                    <Debug data={JSON.parse(JSON.stringify(checkoutSession))} />
                </div>
            )
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-lg font-semibold text-center'>
                Payment failed
            </div>
            <Debug data={JSON.parse(JSON.stringify(checkoutSession))} />
        </div>
    )
}
