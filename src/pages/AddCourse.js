import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form"

import Toast from "../components/common/Toast";
import Images from "../components/course-form/Images";
import Detail from "../components/course-form/Detail";
import Options from "../components/course-form/Otpions";
import { clearMessage, createCourseAync, selectcourse } from "../features/course/courseSlice";

const AddCourse = () => {

    const navigate = useNavigate();

    const { status, message, courseAdd } = useSelector(selectcourse)

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const [photos, setPhotos] = useState();

    const formMethod = useForm();
    const { handleSubmit } = formMethod;

    const onSubmit = handleSubmit((data) => {
        if (photos === "" || undefined) {
            setError("Plase privide some images...")
        }
        dispatch(createCourseAync({ ...data, image: photos }))
    })

    useEffect(() => {
        if (courseAdd) {
            setTimeout(() => {
                navigate("/")
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseAdd]);

    return (
        <FormProvider {...formMethod}>
            <Toast message={message} type={status !== "failed" ? "success" : "err"} clearMessage={clearMessage} />

            <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

                <Detail />

                <Options />

                <Images images={photos} setImages={setPhotos} error={error} setError={setError} />

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

export default AddCourse
