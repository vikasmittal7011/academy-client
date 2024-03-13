import { useEffect } from "react"
import { useDispatch } from "react-redux";

const Toast = ({ type = "success", message, clearMessage }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(clearMessage())
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    return (
        <>
            {message && <div className={`fixed top-4 right-0 md:right-4 z-50 rounded-md max-w-md px-4 py-2 tracking-tight text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`} >
                <div className="flex items-center justify-center">
                    <span className="text-base md:text-xl font-semibold">{message}</span>
                </div>
            </div >
            }
        </>
    )
}

export default Toast
