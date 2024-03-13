import { Header, Hero, Footer } from "../layout/index"

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Hero />
            <div className="md:px-20 p-4 flex-1 py-10">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
