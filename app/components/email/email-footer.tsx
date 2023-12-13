import { Link, Text } from '@react-email/components'

export function Footer() {
    return (
        <Text className='font-sans text-gray-500 text-sm'>
            <Link
                href='https://dogswagshop.com'
                target='_blank'
                className='font-sans text-gray-500 text-sm underline'
            >
                dogswagshop
            </Link>
            , for swag that wags your dog
        </Text>
    )
}
