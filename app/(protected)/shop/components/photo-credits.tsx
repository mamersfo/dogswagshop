import { clsx } from 'clsx'

export default function PhotoCredits({
    id,
    className,
}: {
    id?: string
    className?: string
}) {
    return (
        <div className={clsx('text-xs', className)}>
            Photography by{' '}
            <a
                className='underline'
                href='https://unsplash.com/@karsten116?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
            >
                Karsten Winegeart
            </a>
            {id && (
                <>
                    <span>, source: </span>
                    <a
                        className='underline'
                        href={`https://unsplash.com/photos/${id}?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash`}
                    >
                        Unsplash
                    </a>
                </>
            )}
        </div>
    )
}
