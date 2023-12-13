import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { Amount, Debug } from '@/app/components'
import { type LineItem } from '@/types'
import { createCheckoutSession } from '@/app/actions/stripe'
import { send } from '@/lib/cart'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: cart, error: cartsError } = await supabase
        .from('carts')
        .select('state')
        .maybeSingle()

    if (cartsError) {
        throw cartsError
    }

    const state = cart?.state as any

    return (
        <div className='flex flex-row gap-4'>
            <div className='w-2/3 flex flex-col gap-4'>
                <LineItems lineItems={state?.context.lineItems} />
            </div>
            <div className='w-1/3'>
                <Totals state={state} />
            </div>
        </div>
    )
}

const LineItems = ({ lineItems }: { lineItems: LineItem[] }) => {
    const removeFromCart = async (formData: FormData) => {
        'use server'
        await send({ type: 'removeFromCart', slug: formData.get('slug') })
        revalidatePath('/cart')
    }

    return (
        <>
            <div className='text-lg font-semibold'>Items</div>
            {lineItems?.map((lineItem, idx) => (
                <div
                    key={`cart-product-${idx}}`}
                    className='border border-1 py-8 px-4 flex flex-row place-items-center'
                >
                    <div className='w-1/2'>
                        <div className='flex flex-row gap-4 place-items-center'>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop/karsten-winegeart-${lineItem.slug}-unsplash-thumbnail.jpg`}
                                alt={lineItem.name || '<product.name>'}
                                width={100}
                                height={67}
                                priority={true}
                            />
                            <Link
                                href={`/shop/${lineItem.slug}`}
                                className='hover:underline'
                            >
                                <div className='font-semibold'>
                                    {lineItem?.name}
                                </div>
                                <div className='text-sm'>
                                    Price: <Amount value={lineItem?.price} />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='w-1/4'>
                        <div className='flex flex-col place-items-center'>
                            <div className='text-xs'>aantal</div>
                            <div>{lineItem.quantity}</div>
                        </div>
                    </div>
                    <div className='w-1/4 flex flex-row gap-8'>
                        <Amount value={lineItem.quantity * lineItem.price} />
                        <form action={removeFromCart}>
                            <input
                                type='hidden'
                                name='slug'
                                value={lineItem.slug}
                            />
                            <button>
                                <TrashIcon />
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </>
    )
}

const Totals = ({ state }: { state: any }) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-center'>
                <div className='text-lg'>Cart Total</div>
                <div className='text-2xl font-semibold'>
                    <Amount value={state?.context.itemSum} />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {state?.context.itemSum > 0 && (
                    <form action={createCheckoutSession}>
                        <button className='btn w-full'>Checkout</button>
                    </form>
                )}
                <Link href='/shop' className='btn btn-outline w-full'>
                    Continue shopping
                </Link>
            </div>
            <Debug data={state} />
        </div>
    )
}

const TrashIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
        </svg>
    )
}
