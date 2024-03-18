import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import Details from "../components/event-form/Details";
import { clearMessage, createEventAync, selectevent } from "../features/event/eventSlice";

const AddEvent = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { status, message, eventAdd } = useSelector(selectevent)

    const formMethod = useForm();

    const onSubmit = formMethod.handleSubmit((data) => {
        dispatch(createEventAync({ ...data }))
    })

    useEffect(() => {
        if (eventAdd) {
            setTimeout(() => {
                navigate("/")
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventAdd]);

    return (
        <FormProvider {...formMethod}>
            <Toast message={message} type={status !== "failed" ? "success" : "err"} clearMessage={clearMessage} />

            <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

                <Details />

                <div className="flex flex-col md:flex-row justify-end md:items-center gap-5">
                    <button type="submit" className={`bg-blue-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                        <ClipLoader size={20} color="white" loading={status === "loading"} />
                        <div>Save</div>
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}

export default AddEvent