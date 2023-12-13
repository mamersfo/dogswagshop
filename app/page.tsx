import Link from "next/link";

export default async function Index() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <div className="text-2xl font-semibold">dogswagshop</div>
                <Link href="/shop" className="hover:underline">
                    Enter
                </Link>
            </div>
        </div>
    );
}
