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

export function OrderConfirmationEmail({ context }: { context: OrderContext }) {
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
                <Preview>Order Confirmation</Preview>
                <Body className='bg-white'>
                    <Container className='pl-12 pr-12 margin-auto'>
                        <Heading className='font-sans text-2xl font-semibold'>
                            Order Confirmation
                        </Heading>
                        <Text className='font-sans text-gray-400 text-md'>
                            Dear {context.customer?.name},
                        </Text>
                        <Text className='font-sans text-gray-400 text-md'>
                            We have received your order, thank you for buying at
                            dogswagshop.
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
