import { Draggable } from './draggable'
import type { Order } from '@/types'
import { Card } from './card'

export const lanes = ['queued', 'processing', 'shipped', 'delivered']
export const events = ['assignment', 'shipment', 'reset']

export function Lane({
    laneIdx,
    orders,
    onMove,
}: {
    laneIdx: number
    orders: Order[]
    onMove: (
        id: string,
        fromLane: number,
        toLane: number,
        fromIndex: number,
        toIndex: number
    ) => void
}) {
    return (
        <Draggable
            id={lanes[laneIdx]}
            type='lane'
            accept='item'
            lane={laneIdx}
            index={laneIdx}
            canDrag={false}
            onMove={onMove}
        >
            <div className='bg-gray-200 w-[356px] flex flex-col gap-4 p-4 h-full'>
                <div className='font-semibold'>{lanes[laneIdx]}</div>
                {orders.map((order: Order, itemIdx: number) => (
                    <Card
                        key={`item-${laneIdx}-${itemIdx}`}
                        order={order}
                        laneIdx={laneIdx}
                        itemIdx={itemIdx}
                        onMove={onMove}
                    />
                ))}
            </div>
        </Draggable>
    )
}
