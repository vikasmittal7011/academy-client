import { FormProvider, useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners";
import Details from "../event-form/Details";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, createEventAync, selectevent } from "../../features/event/eventSlice";
import Toast from "../common/Toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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