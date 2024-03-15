import { useSelector } from "react-redux"
import TimeSection from "./TimeSection";
import UserDetails from "./UserDetails";
import { selectcoursernroll } from "../../features/course-enroll/courseEnrollSlice";

const Course = ({ selectedFetching, setSelectedFetching }) => {

    const { courseEnrolls } = useSelector(selectcoursernroll);

    console.log(courseEnrolls)

    return (
        <>
            {courseEnrolls?.length > 0 &&
                <div>
                    <div className="mx-auto max-w-7xl">

                        <TimeSection heading="Course" setSelectedFetching={setSelectedFetching} selectedFetching={selectedFetching} />

                        {courseEnrolls?.map((c, i) => (
                            <div key={i} className="border border-slate-400 rounded-md p-4 my-5">
                                <div className="grid md:grid-cols-[2fr_1fr] gap-3">
                                    <div className="flex flex-col gap-3">
                                        <h1 className="font-bold text-2xl md:text-3xl tracking-wide">{c.courseId.name}</h1>
                                        <p>Course Type: {c.courseId.programmeType}</p>
                                        <p>Learning Mode : {c.courseId.mode}</p>
                                        <p>Learning Eligibility : {c.courseId.eligibility}</p>
                                        <p>Duaration : {Math.round(c.courseId.duration / 12)} Year, {c.courseId.duration % 12} Months</p>
                                        <p>Fees : {c.courseId.fees}</p>
                                    </div>

                                    <UserDetails e={c} />

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            }
        </>
    )
}

export default Course
