import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Profile() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    const signOut = async () => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('error with signOut:', error.message)
        }

        return redirect('/')
    }

    return (
        <div className='dropdown dropdown-end'>
            <label
                tabIndex={0}
                className='btn btn-ghost rounded-btn text-sm lowercase'
            >
                {user?.email}
            </label>
            <ul
                tabIndex={0}
                className='menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-28'
            >
                <li>
                    <Link href='/shop/orders'>Orders</Link>
                </li>
                <li>
                    <Link href='/shop/willow'>Willow</Link>
                </li>
                <li>
                    <form action={signOut}>
                        <button>Logout</button>
                    </form>
                </li>
            </ul>
        </div>
    )
}
