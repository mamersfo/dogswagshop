import { assign, createMachine } from 'xstate'
import { client } from '@/trigger'
import { StripeInfo } from '@/utils/stripe'
import { Customer, Payment, Shipping } from '@/types'

export const orderMachine = createMachine(
    {
        id: 'order-machine',
        types: {} as {
            context: OrderContext
            events: OrderEvent
            actions: OrderAction
        },
        context: {
            number: Math.floor(Math.random() * 1000000 + 1),
            date: new Date(),
        },
        initial: 'ordered',
        states: {
            ordered: {
                on: {
                    payment: {
                        actions: [
                            assign({
                                amount: ({ event }) => event.info.amount,
                                customer: ({ event }) => event.info.customer,
                                payment: ({ event }) => event.info.payment,
                                shipping: ({ event }) => event.info.shipping,
                            }),
                        ],
                        target: 'queued',
                    },
                },
            },
            queued: {
                entry: [
                    {
                        type: 'sendEmail',
                        params: {
                            type: 'order-confirmation',
                        },
                    },
                    {
                        type: 'sendTextMessage',
                        params: {
                            message: 'order-confirmation',
                        },
                    },
                ],
                on: {
                    assignment: {
                        target: 'processing',
                    },
                },
            },
            processing: {
                on: {
                    shipment: {
                        target: 'shipped',
                    },
                },
            },
            shipped: {
                entry: [
                    {
                        type: 'sendEmail',
                        params: {
                            type: 'shipment-notification',
                        },
                    },
                ],
                on: {
                    delivery: {
                        target: 'delivered',
                    },
                    reset: {
                        target: 'queued',
                    },
                },
            },
            delivered: {
                type: 'final',
            },
        },
    },
    {
        actions: {
            sendEmail: ({ context, event }, params) => {
                client.sendEvent({
                    name: 'send.email',
                    payload: {
                        type: params?.type,
                        recipient: context.customer?.email,
                        subject: `Your dogswagshop order #${context.number}`,
                        context,
                    },
                })
            },
            sendTextMessage: ({ context, event }, params) => {
                client.sendEvent({
                    name: 'send.text.message',
                    payload: {
                        text: params.message,
                    },
                })
            },
        },
    }
)

export type OrderContext = {
    number: number
    date: Date
    amount?: number
    customer?: Customer
    payment?: Payment
    shipping?: Shipping
}

export type OrderEvent =
    | {
          type: 'payment'
          info: StripeInfo
      }
    | {
          type: 'assignment'
      }
    | {
          type: 'shipment'
      }
    | {
          type: 'delivery'
      }
    | {
          type: 'reset'
      }

export type OrderAction =
    | {
          type: 'sendEmail'
          params: {
              type: string
          }
      }
    | {
          type: 'sendTextMessage'
          params: {
              message: string
          }
      }
