import { FormProvider, useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners";
import Images from "../components/course-form/Images";
import { useEffect, useState } from "react";
import Detail from "../components/course-form/Detail";
import Options from "../components/course-form/Otpions";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, fetchCourseByIdAync, selectcourse, updateCourseAync } from "../features/course/courseSlice";
import Toast from "../components/common/Toast";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { status, message, course, updateCourse } = useSelector(selectcourse)

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const [photos, setPhotos] = useState();

    const formMethod = useForm();
    const { handleSubmit, reset } = formMethod

    const onSubmit = handleSubmit((data) => {
        if (photos === "" || undefined) {
            setError("Plase privide some images...")
        }
        dispatch(updateCourseAync({ ...data, image: photos }))
    })

    useEffect(() => {
        dispatch(fetchCourseByIdAync(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        reset({ ...course })
        setPhotos(course.image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course]);

    useEffect(() => {
        if (updateCourse) {
            setTimeout(() => {
                navigate(`/course/${course.id}`)
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateCourse]);

    return (
        <FormProvider {...formMethod}>
            <Toast message={message} type={status !== "failed" ? "success" : "err"} clearMessage={clearMessage} />

            {course.name ?
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
                </form> :
                <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                    Course Not Found
                </div>
            }
        </FormProvider>
    )
}

export default EditCourse
