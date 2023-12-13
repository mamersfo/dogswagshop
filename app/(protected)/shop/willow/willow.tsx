'use client'

import { useEventRunStatuses } from '@trigger.dev/react'
import { useEffect, useState } from 'react'
import { ChatBubble } from './chat-bubble'
import { reverse } from 'ramda'

export function Willow() {
    const [threadId, setThreadId] = useState<string | undefined>()
    const [eventId, setEventId] = useState<string | undefined>()

    const { fetchStatus, error, run } = useEventRunStatuses(eventId)

    const [text, setText] = useState('')
    const [messages, setMessages] = useState<any[]>([])

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            let payload

            if (threadId) {
                payload = {
                    threadId,
                    message: text,
                }
            } else {
                payload = {
                    message: text,
                }
            }

            setText('')

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: 'user',
                    text,
                },
            ])

            const response = await fetch('/api/threads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const json = await response.json()
            console.log('json', json)

            if (!response.ok) {
                throw Error(
                    `Status: ${response.status}, ${
                        response.statusText
                    }, json: ${JSON.stringify(json)}`
                )
            }

            setEventId(json.eventId)
        }
    }

    useEffect(() => {
        if (run?.output) {
            console.log('useEffect:', run)

            setThreadId(run.output.threadId)

            const messages = reverse(run?.output?.messages || []).map(
                (msg: any) => ({
                    role: msg.role,
                    text: msg.content[0].text.value,
                })
            )

            setMessages(messages)
        }
    }, [run])

    return (
        <div className='w-3/4 h-full'>
            <div className='h-full'>
                {fetchStatus === 'error' ? (
                    <div>
                        <p>{error.name}</p>
                        <p>{error.message}</p>
                    </div>
                ) : (
                    <ChatBubble status={run?.status} messages={messages} />
                )}
            </div>
            <div className='form-control w-full'>
                <label className='label'>
                    <span className='label-text'>Message:</span>
                </label>
                <input
                    type='text'
                    placeholder='Type here'
                    className='input input-bordered w-full'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}
