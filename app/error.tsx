'use client'

export default function Error({
    error,
}: {
    error?: Error & { digest?: string }
}) {
    return (
        <div className='text-red-500'>
            <div>Something went wrong: {error?.message}</div>
            {error?.digest && <div>(digest: {error.digest})</div>}
        </div>
    )
}
