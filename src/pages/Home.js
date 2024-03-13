import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCoursesAync, selectcourse } from "../features/course/courseSlice";
import { fetchAllEventsAync, selectevent } from "../features/event/eventSlice";
import SimpleLoading from "../components/common/SimpleLoading";
import Courses from "../components/home/Courses";
import Events from "../components/home/Events";

const Home = () => {

    const { status, courses } = useSelector(selectcourse);
    const { status: loading, events } = useSelector(selectevent);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCoursesAync())
        dispatch(fetchAllEventsAync())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {status === "loading" || loading === "loading" || events.length < 0 || courses.length < 0 ?
                <SimpleLoading />
                :
                <>
                    <Courses courses={courses} />
                    <Events events={events} />
                </>
            }
        </div>
    )
}

export default Home
