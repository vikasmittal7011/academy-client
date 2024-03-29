import { Link } from "react-router-dom"

const Courses = ({ courses }) => {
    return (
        <div className="mb-8">
            <h1 className="font-bold text-5xl tracking-wider mb-5">Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses?.map((course, i) => (
                    <div key={i} className="flex gap-2 items-center flex-col border border-slate-300 p-2 rounded-md">
                        <img src={course.image} alt="" className="w-full h-full object-cover object-center rounded-lg" />

                        <p className="line-clamp-3 md:line-clamp-4 font-semibold my-4">{course.discription}</p>

                        <Link to={`/course/${course.id}`} className="bg-green-500 transition-all hover:bg-green-700 text-white w-fit px-5 text-xl py-2">Read More...</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Courses
