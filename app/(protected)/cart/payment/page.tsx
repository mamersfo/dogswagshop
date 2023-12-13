import Link from 'next/link'
import type { Stripe } from 'stripe'
import { stripe } from '@/utils/stripe'
import { Debug } from '@/app/components'

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
        return (
            <div className='flex flex-col gap-4 mt-8'>
                <div className='uppercase text-lg font-semibold'>
                    {`order confirmed!`}
                </div>
                <div>
                    We have received your order. It will be shipped as soon as
                    possible. Please monitor your e-mail in order to follow your
                    package.
                </div>
                <Link href='/shop' className='mt-4 text-sm underline'>
                    Back to shop
                </Link>
                <Debug data={JSON.parse(JSON.stringify(checkoutSession))} />
            </div>
        )
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
