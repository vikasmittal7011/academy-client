import { useSelector } from "react-redux"
import { selecteventrnroll } from "../../features/event-enroll/eventEnrollSlice"
import TimeSection from "./TimeSection";
import UserDetails from "./UserDetails";
import Details from "../event/Details";
import { selectuser } from "../../features/user/userSlice";

const Events = ({ selectedFetching, setSelectedFetching }) => {

    const { user } = useSelector(selectuser)

    const { eventEnrolls } = useSelector(selecteventrnroll)

    console.log(eventEnrolls)

    return (
        <>
            <TimeSection heading="Events" setSelectedFetching={setSelectedFetching} selectedFetching={selectedFetching} />
            {eventEnrolls?.length > 0 ?
                <div>
                    <div className="mx-auto max-w-7xl">

                        {user.role === "admin" && eventEnrolls?.map((e, i) => (
                            <div key={i} className="border border-slate-400 rounded-md p-4 my-5">
                                <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                    <Details event={e.eventId} />

                                    <UserDetails e={e} />

                                </div>
                            </div>
                        ))}

                        {user.role === "user" &&
                            <>
                                {eventEnrolls?.filter((e) => e.user.id === user.id).length > 0 ? eventEnrolls?.filter((e) => e.user.id === user.id)?.map((e, i) => (
                                    <div key={i} className="border border-slate-400 rounded-md p-4 my-5">
                                        <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                            <Details event={e.eventId} />

                                            <UserDetails e={e} />

                                        </div>
                                    </div>)) :
                                    <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                                        You Don't Booked Any Events Now.
                                    </div>
                                }
                            </>
                        }

                    </div>
                </div>
                :
                <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                    Events Not Found
                </div>
            }
        </>
    )
}

export default Events
