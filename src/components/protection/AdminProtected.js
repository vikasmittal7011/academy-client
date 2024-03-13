import { useSelector } from "react-redux"
import { selectuser } from "../../features/user/userSlice"
import { Navigate } from "react-router-dom"

const AdminProtected = ({ children }) => {

    const { user } = useSelector(selectuser)

    if (!user.role === "admin") {
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    )
}

export default AdminProtected
