import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import Toast from "../components/common/Toast";
import Details from "../components/event/Details";
import Form from "../components/enroll-event/Form";
import SimpleLoading from "../components/common/SimpleLoading";
import { clearMessage, selectuser } from "../features/user/userSlice";
import { fetchEventByIdAync, selectevent } from "../features/event/eventSlice";

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
            <Toast message={message} type={validReferCode ? "success" : "err"} clearMessage={clearMessage} />
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    {event.name ?
                        <>
                            <h1 className="mb-5 text-3xl font-bold">Book Your seat fro Event</h1>
                            <div className="border border-slate-400 rounded-md p-4">

                                <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                    <Details event={event} />

                                    <Form referCode={referCode} event={event} user={user} validReferCode={validReferCode} />

                                </div>
                            </div>
                        </> :
                        <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                            Event Not Found
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default EventEnroll
