import { Header, Logout } from '@/app/components'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header title='dogswagshop' href='/shop'>
                <Logout />
            </Header>
            {children}
        </>
    )
}
