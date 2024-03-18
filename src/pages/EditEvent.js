import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form"

import Toast from "../components/common/Toast";
import Details from "../components/event-form/Details";
import { useNavigate, useParams } from "react-router-dom";
import { clearMessage, fetchEventByIdAync, selectevent, updateEventAync } from "../features/event/eventSlice";

const EditEvent = () => {
    const { status, message, eventUpdate, event } = useSelector(selectevent)

    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const formMethod = useForm();

    const onSubmit = formMethod.handleSubmit((data) => {
        dispatch(updateEventAync({ ...data }))
    })

    useEffect(() => {
        if (eventUpdate) {
            setTimeout(() => {
                navigate("/")
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventUpdate]);

    useEffect(() => {
        dispatch(fetchEventByIdAync(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        formMethod.reset({ ...event })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event]);

    return (
        <FormProvider {...formMethod}>
            <Toast message={message} type={status !== "failed" ? "success" : "err"} clearMessage={clearMessage} />

            {event.name ? <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

                <Details />

                <div className="flex flex-col md:flex-row justify-end md:items-center gap-5">
                    <button type="submit" className={`bg-blue-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                        <ClipLoader size={20} color="white" loading={status === "loading"} />
                        <div>Save</div>
                    </button>
                </div>
            </form> :
                <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                    Event Not Found
                </div>
            }
        </FormProvider>
    )
}

export default EditEvent