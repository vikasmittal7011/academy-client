import { useSelector } from "react-redux"
import { selectuser } from "../../features/user/userSlice"
import { Navigate } from "react-router-dom"

const Protected = ({ children }) => {

    const { user } = useSelector(selectuser)

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    )
}

export default Protected
