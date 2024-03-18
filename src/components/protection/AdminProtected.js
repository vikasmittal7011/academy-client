import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import { selectuser } from "../../features/user/userSlice"

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
