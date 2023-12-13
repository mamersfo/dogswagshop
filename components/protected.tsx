import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Protected({
    children,
    redirectTo,
}: {
    children: React.ReactNode
    redirectTo: string
}) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        return <>{children}</>
    }

    return redirect(`/login?redirectTo=${redirectTo}`)
}
