'use client'

import { useCallback, useEffect, useState } from 'react'
import update from 'immutability-helper'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'
import type { Order } from '@/types'
import { Lane, lanes, events } from './lane'

export const Fulfillment = () => {
    const [data, setData] = useState<Order[][]>([])

    const supabase = createClient()

    const query = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select()
                .in('status', ['queued', 'processing', 'shipped', 'delivered'])

            if (error) throw error

            return data
        },
    })

    useEffect(() => {
        if (query.data) {
            setData([
                query.data.filter((d: Order) => d.status === lanes[0]),
                query.data.filter((d: Order) => d.status === lanes[1]),
                query.data.filter((d: Order) => d.status === lanes[2]),
                query.data.filter((d: Order) => d.status === lanes[3]),
            ])
        }
    }, [query.data])

    const handleMove = useCallback(
        async (
            id: string,
            fromLane: number,
            toLane: number,
            fromIndex: number,
            toIndex: number
        ) => {
            if (fromLane === toLane) {
                setData((prev: Order[][]) =>
                    update(prev, {
                        [fromLane]: {
                            $splice: [
                                [fromIndex, 1],
                                [toIndex, 0, prev[fromLane][fromIndex]],
                            ],
                        },
                    })
                )
            } else {
                setData((prev: Order[][]) =>
                    update(prev, {
                        [fromLane]: {
                            $splice: [[fromIndex, 1]],
                        },
                        [toLane]: {
                            $push: [prev[fromLane][fromIndex]],
                        },
                    })
                )

                const url = `/api/orders/${id}`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ type: events[fromLane] }),
                })

                if (response.ok) {
                    const result = await response.json()
                    const actualLane = lanes.indexOf(result.status)

                    if (toLane !== actualLane) {
                        console.error(
                            'toLane:',
                            toLane,
                            'actual lane:',
                            actualLane
                        )
                    }
                }
            }
        },
        []
    )

    return (
        <div className='flex flex-row gap-4 h-screen'>
            {data?.map((orders: Order[], laneIdx: number) => (
                <Lane
                    key={`lane-${laneIdx}`}
                    laneIdx={laneIdx}
                    orders={orders}
                    onMove={handleMove}
                />
            ))}
        </div>
    )
}
