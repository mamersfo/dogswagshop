import clsx from 'clsx'

const steps = ['ordered', 'queued', 'processing', 'shipped', 'delivered']

export function Steps({ status }: { status: string }) {
    const current = steps.indexOf(status)

    return (
        <ul className='steps w-full'>
            {steps.map((s: string, idx: number) => (
                <li
                    className={clsx('step', {
                        'step-secondary': current >= idx,
                    })}
                >
                    {s}
                </li>
            ))}
        </ul>
    )
}
