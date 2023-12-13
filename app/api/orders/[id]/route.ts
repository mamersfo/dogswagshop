import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { send } from '@/lib/order'

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const payload = await req.json()

        const { data, error } = await send(params.id, payload, supabase)
        if (error) throw error

        const status = (data?.state as any)?.value
        return NextResponse.json({ status })
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        )
    }
}
