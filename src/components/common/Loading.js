import { ClipLoader } from "react-spinners"

const Loading = () => {
    return (
        <div className="h-screen justify-center flex items-center">
            <ClipLoader size={100} color="blue" />
        </div>
    )
}

export default Loading
