import { useDispatch, useSelector } from "react-redux"
import { fetchAlleventEnrollsAync, selecteventrnroll } from "../../features/event-enroll/eventEnrollSlice"
import SimpletLoading from "../common/SimpleLoading";
import { useEffect, useState } from "react";
import Events from "../admin-orders/Events";

const AdminOrder = () => {

    const [selectedFetching, setSelectedFetching] = useState("all");

    const { status } = useSelector(selecteventrnroll);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAlleventEnrollsAync(selectedFetching))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFetching]);

    return (
        <>
            {status === "loading" ?
                <SimpletLoading />
                :
                <>
                    <Events selectedFetching={selectedFetching} setSelectedFetching={setSelectedFetching} />
                </>
            }
        </>
    )
}

export default AdminOrder
