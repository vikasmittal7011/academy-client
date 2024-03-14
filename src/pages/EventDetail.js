import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import SimpleLoading from "../components/common/SimpleLoading";
import { selectuser } from "../features/user/userSlice";
import Toast from "../components/common/Toast";
import { clearMessage, fetchEventByIdAync, selectevent } from "../features/event/eventSlice";
import moment from "moment";
import DeleteNotic from "../components/event/DeleteNotic";

const EventDetail = () => {

    const navigate = useNavigate();

    const [urlCopy, setUrlCopy] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const { user } = useSelector(selectuser)

    const { status, event, eventDelete, message } = useSelector(selectevent)

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchEventByIdAync(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleRefer = async () => {
        const url = `http://localhost:3000/register/event/${user.referCode}`;
        await navigator.clipboard.writeText(url)
        setUrlCopy(true)
        setTimeout(() => {
            setUrlCopy(false)
        }, 2000);
    }

    useEffect(() => {
        if (eventDelete) {
            setTimeout(() => {
                navigate("/")
            }, 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventDelete]);

    return (
        <>
            <Toast message={message} type={status === "failed" ? "err" : "success"} clearMessage={clearMessage} />
            <DeleteNotic isOpen={isOpen} handleIsOpen={handleIsOpen} id={event.id} />
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    {event && <>
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
                            </div>

                            <div className="py-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                                {user.role === "admin" && <Link to={`/edit-event/${event.id}`} className="bg-blue-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-blue-700">Edit</Link>}

                                <Link to={`/event/register/${event.id}`} className="bg-green-600 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-green-500">Register</Link>

                                {user.role === "admin" && <button onClick={handleIsOpen} className="bg-red-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-red-700">Delete</button>}

                                <button onClick={handleRefer} className="bg-violet-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-violet-700">{urlCopy ? "Copyed" : "Refer"}</button>
                            </div>


                        </div>

                        <div className="my-5">
                            <h1 className="font-bold text-3xl tracking-wide my-5">Our Speakers</h1>
                            {
                                event?.speakers?.map((speaker, i) => (
                                    <div key={i} className="my-3 border border-slate-300 p-3 rounded-e-sm">
                                        <p>Name: {speaker.name}</p>
                                        <p>About: {speaker.bio}</p>
                                        <p>Post: {speaker.title}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="my-5">
                            <h1 className="font-bold text-3xl tracking-wide my-5">About Event</h1>
                            <p className="text-gray-700">{event.description}</p>
                        </div>
                    </>}
                </>
            }
        </>
    )
}

export default EventDetail
