'use client'

import snarkdown from 'snarkdown'

export function ChatBubble({
    status,
    messages,
}: {
    status?: string
    messages: any[]
}) {
    // if (fetchStatus === 'loading') {
    //     return <p>Loading...</p>
    // }

    return (
        <div className='flex h-full antialiased text-gray-800'>
            <div className='flex flex-row h-full w-full overflow-y-hidden'>
                <div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4'>
                    <div className='flex flex-col h-full overflow-y-hidden mb-4'>
                        <div className='flex flex-col h-full'>
                            <div className='grid grid-cols-12 gap-y-2 h-full content-end'>
                                {messages.map((msg) =>
                                    msg.role === 'user' ? (
                                        <div
                                            key={`msg-${msg.id}`}
                                            className='col-start-6 col-end-13 p-3 rounded-lg'
                                        >
                                            <div className='flex items-center justify-start flex-row-reverse'>
                                                <div className='w-96 relative mr-3 text-md bg-blue-100 py-2 px-4 shadow rounded-xl'>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: snarkdown(
                                                                msg.text
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            key={`msg-${msg.id}`}
                                            className='col-start-1 col-end-8 p-3 rounded-lg'
                                        >
                                            <div className='flex flex-row items-center'>
                                                <div className='w-96 relative ml-3 text-md bg-white py-2 px-4 shadow rounded-xl'>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: snarkdown(
                                                                msg.text
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                                {status === 'STARTED' && (
                                    <div
                                        key={`msg-latest`}
                                        className='col-start-1 col-end-8 p-3 rounded-lg'
                                    >
                                        <div className='flex flex-row items-center'>
                                            <div className='w-12 relative ml-3 text-md bg-white py-2 px-4 shadow rounded-xl'>
                                                <div className='loading loading-dots loading-xs'></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
