'use client'

import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { TriggerProvider } from '@trigger.dev/react'

const queryClient = new QueryClient()

export function Providers({ children }: PropsWithChildren<{}>) {
    return (
        <QueryClientProvider client={queryClient}>
            <DndProvider backend={HTML5Backend}>
                <TriggerProvider
                    publicApiKey={
                        process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY ?? ''
                    }
                >
                    {children}
                </TriggerProvider>{' '}
            </DndProvider>
        </QueryClientProvider>
    )
}
