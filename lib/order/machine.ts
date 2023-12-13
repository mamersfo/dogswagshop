import { createMachine } from 'xstate'

export const orderMachine = createMachine(
    {
        id: 'order-machine',
        types: {} as {
            context: OrderContext
            events: OrderEvent
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
        actions: {},
    }
)

export type OrderContext = {
    number: number
    date: Date
}

export type OrderEvent =
    | {
          type: 'payment'
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
