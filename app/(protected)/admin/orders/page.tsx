import { Fulfillment } from './fulfillment'

export default async function Page() {
    return (
        <div>
            <div className='text-lg font-semibold mb-4'>Orders</div>
            <Fulfillment />
        </div>
    )
}
