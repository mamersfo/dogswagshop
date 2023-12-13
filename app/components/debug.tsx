'use client'

import { useState } from 'react'

export default function Debug({ data }: any) {
    const [debug, setDebug] = useState(false)

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4'>
                <label htmlFor='toggle'>Debug</label>
                <input
                    name='toggle'
                    type='checkbox'
                    className='toggle'
                    checked={debug}
                    onChange={() => setDebug(!debug)}
                />
            </div>
            {debug && (
                <pre className='text-sm'>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    )
}
