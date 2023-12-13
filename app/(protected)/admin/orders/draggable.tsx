// code based on https://react-dnd.github.io/react-dnd/examples/sortable/simple

'use client'

import { useRef, ReactNode } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { XYCoord } from 'react-dnd'

interface DraggableProps {
    id: string
    lane: number | null
    index: number
    type: string
    accept: string
    children: ReactNode
    canDrag?: boolean
    onMove: (
        id: string,
        dragLane: number,
        hoverLane: number,
        dragIndex: number,
        hoverIndex: number
    ) => void
}

export const Draggable = ({
    id,
    lane,
    index,
    type,
    accept,
    children,
    canDrag = true,
    onMove,
}: DraggableProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: accept,

            item: () => {
                return { id, lane, index }
            },

            canDrag: () => canDrag,

            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        []
    )

    const [collected, drop] = useDrop({
        accept,

        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },

        hover(item: any, monitor) {
            if (!ref.current) {
                return
            }

            const fromLane = item.lane
            const toLane = lane!

            const fromIndex = item.index
            const toIndex = index

            // Don't replace items with themselves
            if (fromLane === toLane && fromIndex === toIndex) {
                return
            }

            if (type === 'item ' && fromLane === toLane) {
                // Determine rectangle on screen
                const hoverBoundingRect = ref.current?.getBoundingClientRect()

                // Get vertical middle
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

                // Determine mouse position
                const clientOffset = monitor.getClientOffset()

                // Get pixels to the top
                const hoverClientY =
                    (clientOffset as XYCoord).y - hoverBoundingRect.top

                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%

                // Dragging downwards
                if (fromIndex < toIndex && hoverClientY < hoverMiddleY) {
                    return
                }

                // Dragging upwards
                if (fromIndex > toIndex && hoverClientY > hoverMiddleY) {
                    return
                }
            }
        },

        canDrop(item: any, monitor) {
            const fromLane = item.lane
            const toLane = lane!

            switch (fromLane) {
                case 0:
                    return toLane === 1
                case 1:
                    return toLane === 2
                case 2:
                    return toLane === 0
                default:
                    return false
            }
        },

        drop(item: any, monitor) {
            const fromLane = item.lane
            const toLane = lane!

            const fromIndex = item.index
            const toIndex = index

            onMove(item.id, fromLane, toLane, fromIndex, toIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.

            item.lane = lane!
            item.index = index
        },
    })

    const opacity = isDragging ? 0 : 1

    drag(drop(ref))

    return (
        <div
            ref={ref}
            style={{ opacity }}
            data-handler-id={collected.handlerId}
        >
            {children}
        </div>
    )
}
