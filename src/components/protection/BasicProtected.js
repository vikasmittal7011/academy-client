import { useSelector } from "react-redux"
import { selectuser } from "../../features/user/userSlice"
import { Navigate } from "react-router-dom"

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