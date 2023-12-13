import Image from 'next/image'
import CreditCardIcon from '../icons/credit-card'

import visaIcon from '@/public/icons8-visa.svg'
import mastercardIcon from '@/public/icons8-mastercard.svg'
import amexIcon from '@/public/icons8-american-express.svg'

export default function PaymentMethod({ payment }: { payment?: any | null }) {
    return (
        <table className='table'>
            <tbody>
                <tr>
                    <td>Payment method</td>
                    <td className='text-right'>
                        <CreditCardIcon />
                    </td>
                </tr>
                {payment && (
                    <tr>
                        <td>Card:</td>
                        <td className='text-right flex flex-row gap-4 items-center'>
                            <Image
                                src={getIcon(payment.card)}
                                width={26}
                                height={26}
                                alt={payment.card}
                            />
                            <span>ends with {payment.last4}</span>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

const getIcon = (card: string) => {
    let icon

    switch (card) {
        case 'amex':
            icon = amexIcon
            break
        case 'mastercard':
            icon = mastercardIcon
            break
        case 'visa':
            icon = visaIcon
            break
        default:
            break
    }

    return icon
}
