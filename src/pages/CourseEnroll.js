import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { selectcourse, fetchCourseByIdAync } from "../features/course/courseSlice";
import Toast from "../components/common/Toast";
import { clearMessage, selectuser } from "../features/user/userSlice";
import SimpleLoading from "../components/common/SimpleLoading";
import Form from "../components/course-event/Form";
import Details from "../components/course/Details";

const CourseEnroll = () => {

    const { validReferCode, message, user } = useSelector(selectuser)

    const { course, status } = useSelector(selectcourse)

    const dispatch = useDispatch();

    const { id, referCode } = useParams();

    useEffect(() => {
        dispatch(fetchCourseByIdAync(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            <Toast message={message} type={validReferCode ? "success" : "err"} clearMessage={clearMessage} />
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    {course.name ?
                        <>
                            <h1 className="mb-5 text-3xl font-bold">Enroll In Course</h1>
                            <div className="border border-slate-400 rounded-md p-4">

                                <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                    <Details course={course} />

                                    <Form referCode={referCode} course={course} user={user} validReferCode={validReferCode} />

                                </div>
                            </div>
                        </>
                        :
                        <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                            Events Not Found
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default CourseEnroll
