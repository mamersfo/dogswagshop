import Link from 'next/link'

export default async function Index() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='text-center'>
                <div className='text-2xl font-semibold'>dogswagshop</div>
                <div className='flex flex-row gap-4'>
                    <Link href='/shop' className='hover:underline'>
                        customers
                    </Link>
                    <Link href='/admin' className='hover:underline'>
                        employees
                    </Link>
                </div>
            </div>
        </div>
    )
}
