const Footer = () => {
    return (
        <div className="bg-blue-800 py-5 md:py-10">
            <div className="md:px-20 lg:px-40 p-4 mx-auto text-white font-bold tracking-wider flex md:items-center md:justify-between flex-col md:flex-row gap-3">
                <span className="text-2xl md:text-3xl">Vikey Holidays</span>
                <span className="flex justify-between gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Trems Of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer
