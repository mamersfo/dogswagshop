import Link from 'next/link'
import Image from 'next/image'
import { type Product } from '@/types'
import { Amount } from '@/app/components'

const ProductCard = (product: Product) => {
    return (
        <Link
            href={`/shop/${product.slug}`}
            className='card w-96 bg-base-100 shadow-xl border hover:border-black'
        >
            <figure className='relative h-56'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop/karsten-winegeart-${product.slug}-unsplash-small.jpg`}
                    alt={product.name || '<product.name>'}
                    width={400}
                    height={400}
                    style={{ objectFit: 'cover' }}
                    priority={true}
                />
            </figure>
            <div className='card-body'>
                <h4 className='card-title flex flex-row justify-between'>
                    <span>{product.name}</span>
                    <span>
                        <Amount value={product.price} />
                    </span>
                </h4>
                {product.short_description && (
                    <p className='text-sm'>{product.short_description}</p>
                )}
                {product.tags && (
                    <div className='card-actions justify-end mt-4'>
                        {product.tags.map((tag: string, idx: number) => (
                            <div
                                key={`sku-${product.id}-tag-${idx}`}
                                className='badge badge-outline'
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    )
}

export default ProductCard
