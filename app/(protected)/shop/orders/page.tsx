import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Amount } from '@/app/components'
import { formatRelative, parseISO } from 'date-fns'
import type { Order } from '@/types'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('orders')
        .select()
        .order('date', { ascending: false })

    if (error) {
        throw error
    }

    const now = new Date()

    return (
        <>
            <div className='text-lg font-semibold'>Orders</div>
            <table className='table w-1/2'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Order</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((d: Order, idx: number) => (
                        <tr key={`order-${idx}`}>
                            <td>
                                {d.date &&
                                    formatRelative(parseISO(d.date), now)}
                            </td>
                            <td>
                                <Link
                                    href={`/shop/orders/${d.number}`}
                                    className='hover:underline'
                                >
                                    #{d.number}
                                </Link>
                            </td>
                            <td className='text-right'>
                                <Amount value={d.state?.context?.amount} />
                            </td>
                            <td>{d.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
