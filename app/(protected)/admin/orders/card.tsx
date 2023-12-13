import Image from 'next/image'
import type { Order, LineItem } from '@/types'
import { formatRelative, parseISO } from 'date-fns'
import { Draggable } from './draggable'
import { OrderContext } from '@/lib/order/machine'

export function Card({
    order,
    laneIdx,
    itemIdx,
    onMove,
}: {
    order: Order
    laneIdx: number
    itemIdx: number
    onMove: (
        id: string,
        fromLane: number,
        toLane: number,
        fromIndex: number,
        toIndex: number
    ) => void
}) {
    const lineItems = order.line_items as LineItem[]

    const context = (order.state as any)?.context as OrderContext

    const shipping = context.shipping

    const orderDate =
        order?.date && formatRelative(parseISO(order.date), new Date())

    return (
        <Draggable
            id={order.id}
            type='item'
            accept='item'
            lane={laneIdx}
            index={itemIdx}
            canDrag={true}
            onMove={onMove}
        >
            <div className='p-4 border-2 border-black bg-white rounded-md drop-shadow-lg'>
                <table className='w-full '>
                    <tbody className='table table-xs'>
                        <tr>
                            <td className='align-top'>Items:</td>
                            <td>
                                {lineItems?.map((i: any) => (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop/karsten-winegeart-${i.slug}-unsplash-thumbnail.jpg`}
                                        alt={i.name || '<product.name>'}
                                        width={100}
                                        height={67}
                                        priority={true}
                                    />
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className='w-1/3'>Order:</td>
                            <td className='w-2/3'>{order?.number}</td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td>{orderDate}</td>
                        </tr>
                        <tr>
                            <td>Destination:</td>
                            <td>{shipping?.address.city}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Draggable>
    )
}
