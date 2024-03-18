import { ClipLoader } from "react-spinners"
import { useDispatch, useSelector } from "react-redux";

import { deteleCourseAync, selectcourse } from "../../features/course/courseSlice";

const DeleteNotic = ({ isOpen, handleIsOpen, id }) => {

    const { status, } = useSelector(selectcourse)

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deteleCourseAync(id))
        handleIsOpen();
    }

    return (
        <div className="flex items-center justify-center">
            {isOpen && (
                <div className="fixed py-5 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                    <div className="bg-gray-200 rounded-lg p-6 lg:w-3/4 md:w-3/4 sm:w-3/4 l:w-full s:w-full xs:w-full l:m-5 s:m-5 xs:m-5 transform transition-transform duration-300">
                        <div className="flex justify-between items-center">

                            <button onClick={handleDelete} className={`bg-blue-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                                <ClipLoader size={20} color="white" loading={status === "loading"} />
                                <div>Delete</div>
                            </button>

                            <button onClick={handleIsOpen} type="button" className={`bg-red-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-red-500 transition-all flex justify-center items-center gap-2`}>
                                <div>Cancel</div>
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeleteNotic
