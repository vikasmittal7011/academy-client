import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { clearMessage, logoutUserAsync, selectuser } from "../../features/user/userSlice"
import Toast from "../common/Toast"
import { out } from "../../features/auth/authSlice"
import LoginLinks from "./LoginLinks"

const Header = () => {

    const dispatch = useDispatch();

    const { user, message, status } = useSelector(selectuser)

    const handleClick = () => {
        dispatch(logoutUserAsync());
        dispatch(out());
    }

    return (
        <div className="bg-blue-800 py-3 md:py-6">
            <Toast type={status === "failed" ? "err" : "success"} message={message === "Authentication Failed!!" || "User Not Found" ? "" : message} clearMessage={clearMessage} />
            <div className="md:px-20 lg:px-40 p-4 tracking-wider text-white mx-auto flex justify-between">
                <span className="font-bold text-2xl md:text-3xl cursor-pointer">
                    <Link to="/" className="outline-none">Vikey Holidays</Link>
                </span>
                {!user?.firstName ?
                    <span className="flex space-x-2 text-xl">
                        <Link to="/login" className="rounded-xl flex items-center px-3 bg-white text-blue-700 hover:text-blue-500 hover:bg-gray-100 transition outline-none">Login</Link>
                    </span>
                    :
                    <LoginLinks handleClick={handleClick} />
                }
            </div>
        </div>
    )
}

export default Header
