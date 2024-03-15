import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { selectcourse, fetchCourseByIdAync } from "../features/course/courseSlice";
import Toast from "../components/common/Toast";
import { clearMessage, selectuser } from "../features/user/userSlice";
import SimpleLoading from "../components/common/SimpleLoading";
import Form from "../components/course-event/Form";

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
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    <Toast message={message} type={validReferCode ? "success" : "err"} clearMessage={clearMessage} />
                    <h1 className="mb-5 text-3xl font-bold">Enroll In Course</h1>
                    <div className="border border-slate-400 rounded-md p-4">

                        <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                            <div className="flex flex-col gap-3">
                                <h1 className="font-bold text-2xl md:text-3xl tracking-wide">{course.name}</h1>
                                <p>Course Type: {course.programmeType}</p>
                                <p>Learning Mode : {course.mode}</p>
                                <p>Learning Eligibility : {course.eligibility}</p>
                                <p>Duaration : {Math.round(course.duration / 12)} Year, {course.duration % 12} Months</p>
                                <p>Fees : {course.fees}</p>
                            </div>

                            <Form referCode={referCode} course={course} user={user} validReferCode={validReferCode} />

                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default CourseEnroll
