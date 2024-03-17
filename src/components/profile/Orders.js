import { useDispatch, useSelector } from "react-redux"
import { fetchAlleventEnrollsAync, selecteventrnroll } from "../../features/event-enroll/eventEnrollSlice"
import SimpletLoading from "../common/SimpleLoading";
import { useEffect, useState } from "react";
import Events from "../orders/Events";
import Course from "../orders/Course";
import { fetchAllCourseEnrollsAync } from "../../features/course-enroll/courseEnrollSlice";

const AdminOrder = () => {

    const [selectedFetching, setSelectedFetching] = useState("all");


    const [courseSelectedFetching, setCourseSelectedFetching] = useState("all");


    const { status } = useSelector(selecteventrnroll);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAlleventEnrollsAync(selectedFetching))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFetching]);

    useEffect(() => {
        dispatch(fetchAllCourseEnrollsAync(courseSelectedFetching))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseSelectedFetching]);

    return (
        <>
            {status === "loading" ?
                <SimpletLoading />
                :
                <>
                    <Events selectedFetching={selectedFetching} setSelectedFetching={setSelectedFetching} />
                    <Course selectedFetching={courseSelectedFetching} setSelectedFetching={setCourseSelectedFetching} />
                </>
            }
        </>
    )
}

export default AdminOrder
