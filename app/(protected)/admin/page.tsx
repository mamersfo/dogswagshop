import Link from 'next/link'

export default async function Page() {
    return (
        <div className='flex flex-col gap-4'>
            <Link href='/admin/orders' className='hover:underline'>
                Orders
            </Link>
        </div>
    )
}
