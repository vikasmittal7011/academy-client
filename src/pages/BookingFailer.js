import { Link, useParams } from 'react-router-dom'

const BookingFailer = () => {

    const { message } = useParams()

    return (
        <main className="min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-xl md:text-4xl font-bold tracking-tight text-red-600 sm:text-5xl">
                    Failed To Book. {message}
                </h1>
                <div className="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-4">
                    <Link
                        to="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back home
                    </Link>
                    <p className="text-md font-semibold text-gray-900">
                        Contact as via email{" "}
                        <span className="text-blue-600 text-lg ml-2 font-bold font-serif">
                            vikasaggrawal700@gmail.com
                        </span>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default BookingFailer
