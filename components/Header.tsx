import type { NextPage } from "next";

const Header = ({children}: HeaderProps) => {
    return (
        <nav className="flex justify-between gap-4 p-4 sticky-0 bg-white">
            <div className="left">
                <h1 className="text-2xl font-semibold">
                    Zurich Customer Portal
                </h1>
            </div>
            <div className="right">
                <div className="h-8">
                    {children}
                </div>
            </div>
        </nav>
    )
}

export default Header;