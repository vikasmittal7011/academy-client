import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"

import Toast from "../components/common/Toast";
import Details from "../components/course/Details";
import { selectuser } from "../features/user/userSlice";
import DeleteNotic from "../components/course/DeleteNotic";
import SimpleLoading from "../components/common/SimpleLoading";
import { clearMessage, fetchCourseByIdAync, selectcourse } from "../features/course/courseSlice";

const CourseDetail = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { id } = useParams();

    const [urlCopy, setUrlCopy] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useSelector(selectuser)
    const { status, course, deteleCourse, message } = useSelector(selectcourse)

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleRefer = async () => {
        const url = `http://localhost:3000/course/register/${course.id}/${user.referCode}`;
        await navigator.clipboard.writeText(url)
        setUrlCopy(true)
        setTimeout(() => {
            setUrlCopy(false)
        }, 2000);
    }

    useEffect(() => {
        dispatch(fetchCourseByIdAync(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (deteleCourse) {
            setTimeout(() => {
                navigate("/")
            }, 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deteleCourse]);

    return (
        <>
            <Toast message={message} type={status === "failed" ? "err" : "success"} clearMessage={clearMessage} />
            <DeleteNotic isOpen={isOpen} handleIsOpen={handleIsOpen} id={course.id} />
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    {course.name ?
                        <>
                            <div className="border border-slate-400 rounded-md p-4">
                                <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                    <Details course={course} />
                                    <div>
                                        <img src={course.image} alt="" className="w-full h-full object-cover object-center rounded-lg" />
                                    </div>
                                </div>

                                <div className="py-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                                    {user.role === "admin" && <Link to={`/edit-course/${course.id}`} className="bg-blue-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-blue-700">Edit</Link>}

                                    <Link to={`/course/register/${course.id}`} className="bg-green-600 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-green-500">Register</Link>

                                    {user.role === "admin" && <button onClick={handleIsOpen} className="bg-red-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-red-700">Delete</button>}

                                    <button onClick={handleRefer} className="bg-violet-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-violet-700">{urlCopy ? "Copyed" : "Refer"}</button>
                                </div>


                            </div>
                            <div className="my-5">
                                <h1 className="font-bold text-3xl tracking-wide my-5">About Course</h1>
                                <p className="text-gray-700">{course.discription}</p>
                            </div>
                        </>
                        :
                        <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                            Course Not Found
                        </div>
                    }
                </>
            }
        </>
    )
}

export default CourseDetail
