import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { fetchCourseByIdAync, selectcourse } from "../features/course/courseSlice";
import SimpleLoading from "../components/common/SimpleLoading";
import { selectuser } from "../features/user/userSlice";

const CourseDetail = () => {

    const [urlCopy, setUrlCopy] = useState(false);

    const { user } = useSelector(selectuser)

    const { status, course } = useSelector(selectcourse)

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchCourseByIdAync(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleRefer = async () => {
        const url = `http://localhost:3000/register/course/${user.referCode}`;
        await navigator.clipboard.writeText(url)
        setUrlCopy(true)
        setTimeout(() => {
            setUrlCopy(false)
        }, 2000);
    }

    return (
        <>
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    <div className="border border-slate-400 rounded-md p-4">
                        <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                            <div className="flex flex-col gap-3">
                                <h1 className="font-bold text-2xl md:text-3xl tracking-wide">{course.name}</h1>
                                <p>Course Type: {course.programmeType}</p>
                                <p>Learning Mode : {course.mode}</p>
                                <p>Learning Eligibility : {course.eligibility}</p>
                                <p>Duaration : {course.duration / 12} Year, {course.duration % 12} Months</p>
                                <p>Fees : {course.fees}</p>
                            </div>
                            <div>
                                <img src={course.image} alt="" className="w-full h-full object-cover object-center rounded-lg" />
                            </div>
                        </div>

                        <div className="py-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                            {user.role === "admin" && <Link className="bg-blue-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-blue-700">Edit</Link>}

                            <Link className="bg-green-600 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-green-500">Register</Link>

                            {user.role === "admin" && <button className="bg-red-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-red-700">Delete</button>}

                            <button onClick={handleRefer} className="bg-violet-500 text-center rounded-md text-lg px-4 py-2 outline-none transition-all text-white hover:bg-violet-700">{urlCopy ? "Copyed" : "Refer"}</button>
                        </div>


                    </div>
                    <div className="my-5">
                        <h1 className="font-bold text-3xl tracking-wide my-5">About Course</h1>
                        <p className="text-gray-700">{course.discription}</p>
                    </div>
                </>
            }
        </>
    )
}

export default CourseDetail
