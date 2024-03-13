import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCoursesAync, selectcourse } from "../features/course/courseSlice";
import SimpleLoading from "../components/common/SimpleLoading";
import Courses from "../components/home/Courses";

const Home = () => {

    const { status, courses } = useSelector(selectcourse);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCoursesAync())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {status === "loading" ?
                <SimpleLoading />
                :
                <>
                    <Courses courses={courses} />
                </>
            }
        </div>
    )
}

export default Home
