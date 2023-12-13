import Link from 'next/link'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'
import { type Product } from '@/types'
import { Amount } from '@/app/components'
import PhotoCredits from './photo-credits'

export default function ProductDetails(product: Product) {
    const addToCart = async () => {
        'use server'
        revalidatePath('/shop')
    }

    return (
        <div className='flex flex-row gap-4 w-full'>
            <div className='w-3/5 flex flex-col gap-4'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop/karsten-winegeart-${product.slug}-unsplash-medium.jpg`}
                    alt={product.name || '<product.name>'}
                    width={1920}
                    height={1282}
                    priority={true}
                />
                <PhotoCredits id={product.slug} />
            </div>
            <div className='w-2/5 flex flex-col'>
                <h1 className='text-3xl font-bold uppercase'>{product.name}</h1>
                <div className='text-lg font-semibold mt-2'>
                    <Amount value={product.price} />
                </div>
                <div className='prose mt-4'>
                    <h3 className='text-md mt-2'>
                        {product.short_description}
                    </h3>
                    {product.long_description && (
                        <div
                            className='[&>*]:mb-3 [&>*:last-child]:mb-0'
                            dangerouslySetInnerHTML={{
                                __html: product.long_description,
                            }}
                        />
                    )}
                </div>
                <form action={addToCart}>
                    <button className='mt-8 btn uppercase w-full'>
                        add to cart
                    </button>
                </form>
                <Link href='/shop' className='mt-4 text-sm underline'>
                    Back to shop
                </Link>
            </div>
        </div>
    )
}
