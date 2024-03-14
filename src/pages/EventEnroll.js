import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchEventByIdAync, selectevent } from "../features/event/eventSlice";
import moment from "moment";
import Toast from "../components/common/Toast";
import { clearMessage, selectuser } from "../features/user/userSlice";
import Form from "../components/enroll-event/Form";
import SimpleLoading from "../components/common/SimpleLoading";

const EventEnroll = () => {

    const { validReferCode, message, user } = useSelector(selectuser)

    const { event, status } = useSelector(selectevent)

    const dispatch = useDispatch();

    const { id, referCode } = useParams();

    useEffect(() => {
        dispatch(fetchEventByIdAync(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    <Toast message={message} type={validReferCode ? "success" : "err"} clearMessage={clearMessage} />
                    <h1 className="mb-5 text-3xl font-bold">Book Your seat fro Event</h1>
                    <div className="border border-slate-400 rounded-md p-4">

                        <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                            <div className="flex flex-col gap-3">
                                <h1 className="font-bold text-2xl md:text-3xl tracking-wide">{event.name}</h1>
                                <p>Venue : {event?.location?.address}, {event?.location?.state}, {event?.location?.country}, {event?.location?.zipCode}</p>
                                <a className="underline" href={event?.location?.mapLocation} rel="noreferrer" target="_blank">Map Location</a>
                                <p>Start Date : {moment(event.startDate).format('MMMM Do YYYY, h:mm a')}</p>
                                <p>End Date : {moment(event.endDate).format('MMMM Do YYYY, h:mm a')}</p>
                                <p>Fees : ₹ {event.fees} /-</p>
                            </div>

                            <Form referCode={referCode} event={event} user={user} validReferCode={validReferCode} />

                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default EventEnroll
