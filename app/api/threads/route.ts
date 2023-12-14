import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/trigger'

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json()

        const event = await client.sendEvent({
            name: 'run.shop.assistant',
            payload,
        })

        return NextResponse.json({ eventId: event.id })
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        )
    }
}
