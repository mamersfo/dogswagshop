import { ProductDetails } from '../components'
import { type Product } from '@/types'
import { supabase } from '@/utils/supabase/static'

export const generateStaticParams = async () => {
    const { data: products, error } = await supabase.from('products').select()

    if (products && !error) {
        return products.map((product) => ({ slug: product.slug }))
    }

    return []
}

const Page = async ({ params }: { params: { slug: string } }) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('slug', params.slug)
        .maybeSingle()

    if (error) {
        throw new Error(error.message)
    }

    return <ProductDetails {...(data as Product)} />
}

export default Page
