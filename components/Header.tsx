const Header = ({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) => {
    return (
        <div className='flex flex-row justify-between'>
            <div className='text-xl font-semibold'>{title}</div>
            <div className='flex flex-row gap-4 h-10'>{children}</div>
        </div>
    )
}

export default Header
