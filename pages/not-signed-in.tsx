import type { NextPage } from "next";
import { ButtonPrimary } from "@/components/ButtonPrimary";
import Link from 'next/link'


const NotSignedIn: NextPage = () => {
    return (
        <main className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
            <h1 className="text-red-500 text-4xl font-bold">Error</h1>
            <h2>You are not signed in</h2>
            <div className="h-12">
                <Link href="/">
                    <ButtonPrimary>
                    Return to Home Page
                    </ButtonPrimary>
                </Link>
            </div>
        </main>
    )
};

export default NotSignedIn;