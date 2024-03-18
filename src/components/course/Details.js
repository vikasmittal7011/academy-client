const Details = ({ course }) => {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl md:text-3xl tracking-wide">{course.name}</h1>
            <p>Course Type: {course.programmeType}</p>
            <p>Learning Mode : {course.mode}</p>
            <p>Learning Eligibility : {course.eligibility}</p>
            <p>Duaration : {Math.round(course.duration / 12)} Year, {course.duration % 12} Months</p>
            <p>Fees : {course.fees}</p>
        </div>
    )
}

export default Details
