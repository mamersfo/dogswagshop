import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Logout() {
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
        <form action={signOut}>
            <button className='cursor-pointer h-10'>Logout</button>
        </form>
    )
}
