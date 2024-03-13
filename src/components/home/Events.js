import moment from "moment"
import { Link } from "react-router-dom"

const Events = ({ events }) => {
    return (
        <>
            <h1 className="font-bold text-5xl tracking-wider mb-5">Events</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events?.map((event, i) => (
                    <div key={i} className="flex items-start flex-col border border-slate-300 p-2 rounded-md">

                        <h2 className="font-bold text-2xl">{event.name}</h2>

                        <p className="font-semibold my-2">₹ {event.fees} /-</p>

                        <p className="font-semibold my-2">Start On:
                            <span className="font-bold"> {moment(event.startDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </p>

                        <p className="font-bold my-2">Invited Motivator:
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {event?.speakers?.map((speaker, i) => (
                                    <span ksy={i} className="bg-gray-400 ms-1 p-1 rounded-sm font-semibold">{speaker.name}</span>
                                ))}
                            </div>
                        </p>

                        <p className="line-clamp-4 font-semibold my-2">{event.description}</p>

                        <Link to={`/event/${event.id}`} className="bg-green-500 transition-all hover:bg-green-700 text-white w-fit px-5 text-xl py-2">Read More...</Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Events
