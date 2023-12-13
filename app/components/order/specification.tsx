import { OrderContext } from '@/lib/order/machine'
import { Amount } from '..'
import { Order } from '@/types'
import type { LineItem } from '@/types'

export default function Specification({ order }: { order: Order }) {
    const context = order.state?.context as OrderContext

    const totalAmount = (context.amount || 0) + (context.shipping?.amount || 0)

    return (
        <table className='table w-full'>
            <thead>
                <tr>
                    <th className='w-1/4'>Item</th>
                    <th className='w-1/4 text-right'>Price</th>
                    <th className='w-1/4 text-right'>Quantity</th>
                    <th className='w-1/4 text-right'>Amount</th>
                </tr>
            </thead>
            <tbody>
                {(order.line_items as LineItem[])?.map(
                    (li: LineItem, idx: number) => (
                        <tr key={`line-item-${idx}`}>
                            <td className='w-1/4'>{li.name}</td>
                            <td className='w-1/4 text-right'>
                                <Amount value={li.price} />
                            </td>
                            <td className='w-1/4 text-right'>{li.quantity}</td>
                            <td className='w-1/4 text-right'>
                                <Amount value={li.price * li.quantity} />
                            </td>
                        </tr>
                    )
                )}
                <tr key={'shipping-cost'}>
                    <td className='w-1/4 capitalize'>
                        {context.shipping?.method} delivery
                    </td>
                    <td colSpan={2}></td>
                    <td className='w-1/4 text-right'>
                        {context.shipping?.amount && (
                            <Amount value={context.shipping.amount} />
                        )}
                    </td>
                </tr>
                <tr key={'shipping-cost'}>
                    <td className='w-1/4'>Total</td>
                    <td colSpan={2}></td>
                    <td className='w-1/4 text-right font-semibold'>
                        <Amount value={totalAmount} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
