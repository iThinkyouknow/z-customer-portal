const Footer = ({children}: FooterProps) => {
    return (
        <footer className="w-screen p-8 bg-slate-900 text-white left-0 bottom-0">
            This is a footer

            {children}
        </footer>
    )
};

export default Footer;