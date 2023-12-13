import { assign, createMachine } from 'xstate'
import { v4 as uuidv4 } from 'uuid'
import type { LineItem } from '@/types'

export type Context = {
    cartId: string
    lineItems: LineItem[]
    itemCount: number
    itemSum: number
}

export const cartMachine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnALgOlgCwHsAHIgSwDsoBiVCCAbQAYBdRUIg2UzUg8tkAA9EARhGNsAdgBsAZgCcAVkXzJikQA5G8jQBoQAT0SKATPOzjJIydo0mALCcaSAvi-1osuQiQrV0YAC2BABuYEysSCAcXDx8AsIIIo7YJhr20oyMihq5ydL6RgiSsiapzpKS8g4iqoqybh4YOPjEZJRUIaRgAO4RAjHcvPxRibKSGtgZGiXZJrUmaYqFiNLJFiaVi-WyyqWNIJ44R1TIeGDIANYEAK6Y-VGDcSOgiSplYor2u1+5MwWGVaMWRTOwyRjSEw5H4HI7YM4Xa53U58HjkG7hFgDThDeKjIGSbAKCHieyKRhQjTLQEIUofezpUpk+QkxSw5rw85XW6YKjkMCCe5Yx4454JRC5exTWQMjRiUpqWQrBAqaQbEyyESyCHKUwidlefCkXwdfmCh7sUXDcUIKlS+SOaR2ypUxj2ZVyomLeRa+w6dTfewGnBEVAGQJgci82A3ZDIOCwC3RK1416iSRS+pQsn2aalWRKmmOQkarWasmZN0y4PYUPhyO8gBmqFIABsbgEk09rfikhnsFmvl88xrC0UnCIpLtpJIzBN5-IGgdyAQIHABEdsbEe2mEABaAFFPeKbDyM9nmUaGciaTktnuQ4c1omqBb3EvISIaoDmcFn3jB1dj0Gk1hBKpFGkH00lybV7yaLxNxFbdU0-BB7EqCxsmSHJ5hmJRqSKUCpCUSCRGgjRtVcB84QRbk7jfMVe1ncxanUPYtXJBxlUyEERHJZjZDlMQzBrI0XwYndUPERhJ0yHQJnmVQNB0ZUVBPKoKTlOxGDseRpBrOsIyjCSUMSRxlXsG8BxMSC3XSGYKPkNw3CAA */
        id: 'cart',
        types: {} as {
            context: Context
            events:
                | {
                      type: 'addToCart'
                      slug: string
                      name: string
                      price: number
                  }
                | { type: 'removeFromCart'; slug: string }
                | { type: 'resetCart' }
        },
        context: {
            cartId: uuidv4(),
            lineItems: [],
            itemCount: 0,
            itemSum: 0,
        },
        initial: 'shopping',
        states: {
            shopping: {
                on: {
                    addToCart: {
                        target: 'shopping',
                        actions: ['add', 'count', 'sum'],
                    },
                    removeFromCart: {
                        target: 'shopping',
                        actions: ['remove', 'count', 'sum'],
                    },
                    resetCart: {
                        target: 'shopping',
                        actions: ['reset'],
                    },
                },
            },
        },
    },
    {
        actions: {
            add: assign({
                lineItems: ({ context, event }) => {
                    if (event.type === 'addToCart') {
                        const found = context.lineItems.filter(
                            (li) => li.slug === event.slug
                        )

                        if (found.length > 0) {
                            return context.lineItems.map((li) => {
                                if (li.slug === event.slug) {
                                    li.quantity += 1
                                }
                                return li
                            })
                        } else {
                            return [
                                ...context.lineItems,
                                {
                                    slug: event.slug,
                                    name: event.name,
                                    price: event.price,
                                    quantity: 1,
                                },
                            ]
                        }
                    }

                    return context.lineItems
                },
            }),
            remove: assign({
                lineItems: ({ context, event }) => {
                    if (event.type === 'removeFromCart') {
                        return context.lineItems.filter(
                            (li) => li.slug !== event.slug
                        )
                    }

                    return context.lineItems
                },
            }),
            count: assign({
                itemCount: ({ context }) =>
                    context.lineItems.reduce((m, n) => m + n.quantity, 0),
            }),
            sum: assign({
                itemSum: ({ context }) =>
                    context.lineItems.reduce(
                        (m, n) => m + n.quantity * n.price,
                        0
                    ),
            }),
            reset: assign({
                cartId: uuidv4(),
                lineItems: [],
                itemCount: 0,
                itemSum: 0,
            }),
        },
    }
)
