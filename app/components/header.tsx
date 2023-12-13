import Link from 'next/link'
import PawIcon from '@/app/components/icons/paw'

const Header = ({
    title,
    href,
    children,
}: {
    title: string
    href: string
    children: React.ReactNode
}) => {
    return (
        <div className='flex flex-row justify-between mb-4'>
            <Link
                href={href}
                className='text-xl font-semibold flex flex-row gap-2 place-items-center h-10'
            >
                <span>{title}</span>
                <PawIcon width={20} height={20} />
            </Link>
            <div className='flex flex-row gap-4 h-10'>{children}</div>
        </div>
    )
}

export default Header
