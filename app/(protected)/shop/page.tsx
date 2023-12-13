import { Protected } from '@/app/components'
import { PhotoCredits, ProductCard } from './components'
import { supabase } from '@/utils/supabase/static'
import { type Product } from '@/types'

export default async function Page() {
    const { data, error } = await supabase.from('products').select()

    if (error) {
        throw new Error(error.message)
    }

    return (
        <Protected redirectTo='/shop'>
            <div className='flex flex-row flex-wrap gap-4'>
                {data.map((d, idx) => (
                    <ProductCard
                        key={`product-card-${idx}`}
                        {...(d as Product)}
                    />
                ))}
            </div>
            <div className='mt-4'>
                <PhotoCredits />
            </div>
        </Protected>
    )
}
