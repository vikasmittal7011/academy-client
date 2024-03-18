import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import { selectuser } from "../../features/user/userSlice"

const BasicProtected = ({ children }) => {

    const { user } = useSelector(selectuser)

    if (!user.role) {
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    )
}

export default BasicProtected
