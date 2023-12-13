import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Tailwind,
    Text,
} from '@react-email/components'
import { Footer } from './email-footer'
import { OrderContext } from '@/lib/order/machine'

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : ''

export function ShipmentNotificationEmail({
    context,
}: {
    context: OrderContext
}) {
    return (
        <Tailwind
            config={{
                theme: {
                    fontFamily: {
                        sans: ['Roboto', 'sans-serif'],
                    },
                },
            }}
        >
            <Html>
                <Head />
                <Preview>Your order has been shipped</Preview>
                <Body className='bg-white'>
                    <Container className='pl-12 pr-12 margin-auto'>
                        <Heading className='font-sans text-2xl font-semibold'>
                            Order #{context.number} has been shipped
                        </Heading>
                        <Text className='font-sans text-gray-400 text-md'>
                            Dear {context.customer?.name},
                        </Text>
                        <Text className='font-sans text-gray-400 text-md'>
                            We are thrilled to let you know your order is on its
                            way.
                        </Text>
                        <Link
                            href={`http://localhost:3000/shop/orders/${context.number}`}
                            target='_blank'
                            className='font-sans text-gray-500 text-sm underline'
                        >
                            View your order
                        </Link>
                        <Footer />
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}
