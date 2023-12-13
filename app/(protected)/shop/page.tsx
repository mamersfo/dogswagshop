import { Protected } from '@/app/components'

export default async function Page() {
    return (
        <Protected redirectTo='/shop'>
            <div className='flex items-center justify-center p-72'>
                <div className='text-2xl font-semibold text-center'>
                    dogswagshop
                </div>
            </div>
        </Protected>
    )
}
