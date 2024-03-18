import { useSelector } from "react-redux"
import TimeSection from "./TimeSection";
import UserDetails from "./UserDetails";
import { selectcoursernroll } from "../../features/course-enroll/courseEnrollSlice";
import { selectuser } from "../../features/user/userSlice";
import Details from "../course/Details";

const Course = ({ selectedFetching, setSelectedFetching }) => {

    const { user } = useSelector(selectuser);

    const { courseEnrolls } = useSelector(selectcoursernroll);

    return (
        <>
            <TimeSection heading="Courses" setSelectedFetching={setSelectedFetching} selectedFetching={selectedFetching} user={user} />
            {courseEnrolls?.length > 0 ?
                <div>
                    <div className="mx-auto max-w-7xl">


                        {user.role === "admin" && courseEnrolls?.map((c, i) => (
                            <div key={i} className="border border-slate-400 rounded-md p-4 my-5">
                                <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                    <Details course={c.courseId} />

                                    <UserDetails e={c} user={user} />

                                </div>
                            </div>
                        ))}

                        {user.role === "user" &&
                            <>
                                {courseEnrolls?.filter((c) => c.user.id === user.id).length > 0 ? courseEnrolls?.filter((c) => c.user.id === user.id)?.map((c, i) => (
                                    <div key={i} className="border border-slate-400 rounded-md p-4 my-5">
                                        <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                            <Details course={c.courseId} />

                                            <UserDetails e={c} user={user} />

                                        </div>
                                    </div>
                                ))
                                    :
                                    <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                                        You don't Enroll Any Course
                                    </div>
                                }
                            </>
                        }

                    </div>
                </div >
                :
                <div className="font-bold flex justify-center mt-10 text-2xl text-red-500">
                    Courses Not Found
                </div>
            }
        </>
    )
}

export default Course
