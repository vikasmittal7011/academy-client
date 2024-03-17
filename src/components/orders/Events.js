import { useSelector } from "react-redux"
import { selecteventrnroll } from "../../features/event-enroll/eventEnrollSlice"
import moment from "moment";
import TimeSection from "./TimeSection";
import UserDetails from "./UserDetails";

const Events = ({ selectedFetching, setSelectedFetching }) => {

    const { eventEnrolls } = useSelector(selecteventrnroll)

    return (
        <>
            {eventEnrolls?.length > 0 &&
                <div>
                    <div className="mx-auto max-w-7xl">

                        <TimeSection heading="Events" setSelectedFetching={setSelectedFetching} selectedFetching={selectedFetching} />

                        {eventEnrolls?.map((e, i) => (
                            <div key={i} className="border border-slate-400 rounded-md p-4 my-5">
                                <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                    <div className="flex flex-col gap-3">
                                        <h1 className="font-bold text-xl md:text-2xl tracking-wide">{e.eventId.name}</h1>
                                        <p>Venue : {e.eventId?.location?.address}, {e.eventId?.location?.state}, {e.eventId?.location?.country}, {e.eventId?.location?.zipCode}</p>
                                        <a className="underline" href={e.eventId?.location?.mapLocation} rel="noreferrer" target="_blank">Map Location</a>
                                        <p>Start Date : {moment(e.eventId.startDate).format('MMMM Do YYYY, h:mm a')}</p>
                                        <p>End Date : {moment(e.eventId.endDate).format('MMMM Do YYYY, h:mm a')}</p>
                                        <p>Fees : ₹ {e.eventId.fees} /-</p>
                                    </div>

                                    <UserDetails e={e} />

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            }
        </>
    )
}

export default Events
