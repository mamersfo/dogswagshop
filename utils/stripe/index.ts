import { Customer, Payment, Shipping } from '@/types'
import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2023-10-16',
    appInfo: {
        name: 'lunch-app',
        url: 'http://localhost:3000',
    },
})

export type StripeInfo = {
    id: string
    amount: number
    customer: Customer
    payment: Payment
    shipping: Shipping
}

export const retrieveCheckoutSession = async (id: string) => {
    const session = await stripe.checkout.sessions.retrieve(id, {
        expand: [
            'payment_intent',
            'payment_intent.payment_method',
            'shipping_cost.shipping_rate',
        ],
    })

    const customerDetails =
        session.customer_details as Stripe.Checkout.Session.CustomerDetails

    const customer = {
        name: customerDetails.name,
        email: customerDetails.email,
        address: customerDetails.address,
    } as Customer

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent
    const paymentMethod = paymentIntent.payment_method as Stripe.PaymentMethod
    const card = paymentMethod.card

    const payment = {
        card: card?.brand,
        last4: card?.last4,
    } as Payment

    const cost = session.shipping_cost as Stripe.Checkout.Session.ShippingCost
    const rate = cost?.shipping_rate as Stripe.ShippingRate
    const details =
        session.shipping_details as Stripe.Checkout.Session.ShippingDetails

    const shipping = {
        name: details?.name,
        address: details?.address,
        method: rate?.display_name?.toLowerCase(),
        carrier: rate?.metadata?.carrier,
        amount: rate.fixed_amount?.amount,
    } as Shipping

    return {
        id: session.client_reference_id,
        amount: session.amount_total,
        customer,
        payment,
        shipping,
    } as StripeInfo
}
