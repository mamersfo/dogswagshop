export default function Shipping({ shipping }: { shipping?: any | null }) {
    return (
        <table className='table w-full'>
            <tbody>
                <tr>
                    <td>Shipping method:</td>
                    <td>{shipping?.method}</td>
                </tr>
                <tr>
                    <td>Carrier:</td>
                    <td>{shipping?.carrier}</td>
                </tr>
                <tr>
                    <td className='align-top'>Ship to:</td>
                    <td>
                        <div>{shipping?.name}</div>
                        <div>{shipping?.address.line1}</div>
                        {shipping?.address.line2 && (
                            <div>{shipping.address.line1}</div>
                        )}
                        <div>
                            {shipping?.address.postal_code}{' '}
                            {shipping?.address.city}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
