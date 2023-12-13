import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { formatRelative, parseISO } from 'date-fns'
import { Order } from '@/types'
import {
    Shipping,
    PaymentMethod,
    Specification,
    Steps,
} from '@/app/components/order'
import { OrderContext } from '@/lib/order/machine'
import { Json } from '@/types/supabase'

export default async function Page({
    params: { number },
}: {
    params: { number: number }
}) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('orders')
        .select()
        .eq('number', number)
        .maybeSingle()

    if (error) {
        throw error
    }

    const order = data as Order

    if (order) {
        let state = order?.state as Json
        let context = state?.context as OrderContext

        return (
            <div className='flex flex-col gap-4 mt-8'>
                <div className='flex flex-row gap-16 w-full'>
                    <div className='flex flex-col gap-4 w-1/3'>
                        <>
                            <Heading title='order' />
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td>Order number:</td>
                                        <td className='font-semibold'>
                                            #{order.number}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Order date:</td>
                                        <td className=''>
                                            {order?.date &&
                                                formatRelative(
                                                    parseISO(
                                                        order.date as string
                                                    ),
                                                    new Date()
                                                )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        <div className='divider' />
                        <>
                            <Heading title='shipping' />
                            <Shipping shipping={context.shipping} />
                        </>
                        <div className='divider' />
                        <>
                            <Heading title='payment' />
                            <PaymentMethod payment={context.payment} />
                        </>
                    </div>
                    <div className='flex flex-col gap-4 w-2/3'>
                        <div>
                            <Heading title='status' />
                            <div className='my-8'>
                                {order.status && (
                                    <Steps status={order.status} />
                                )}
                            </div>
                        </div>
                        <div>
                            <Heading title='items' />
                            <Specification order={order!} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <></>
}

const Heading = ({ title }: { title: string }) => {
    return <div className='uppercase text-lg font-semibold'>{title}</div>
}
