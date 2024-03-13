import { useSelector } from "react-redux"
import { clearMessage, selectuser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import ProfileUpdateForm from "../components/profile/ProfileUpdateForm";
import { useState } from "react";
import Toast from "../components/common/Toast";

const Profile = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const navigate = useNavigate();

    const { user, status, message } = useSelector(selectuser);

    return (
        <div>
            <Toast message={message} type={status !== "failed" ? "success" : "err"} clearMessage={clearMessage} />
            <ProfileUpdateForm isOpen={isOpen} handleIsOpen={handleIsOpen} />
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    My Profile
                </h1>
            </div>
            <button
                onClick={handleIsOpen}
                className="bg-blue-300 hover:bg-blue-400 transition text-green-900 font-semibold mt-6 py-2 px-4 mr-2 rounded"
            >
                Update My Porfile
            </button>
            {user && (
                <div className="mx-10 my-8">
                    <h2 className="font-bold text-xl mb-3 text-green-500">
                        Name: {user?.firstName} {user.lastName}
                    </h2>
                    <h2 className="font-bold text-xl mb-1 text-blue-400">
                        Email: {user?.email}
                    </h2>
                    {
                        user.contact && <h2 className="font-bold text-xl mb-1 text-cyan-400">
                            Contact: {user?.contact}
                        </h2>
                    }
                    <h2 className="font-bold text-xl mb-1 text-yellow-400">
                        My Refer Code: {user?.referCode}
                    </h2>
                    {user.role === "admin" &&
                        <>
                            <button
                                onClick={() => navigate("/add-hotel")}
                                className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold mt-6 py-2 px-4 mr-2 rounded transition-all"
                            >
                                Add New Event
                            </button>
                            <button
                                onClick={() => navigate("/add-hotel")}
                                className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold mt-6 py-2 px-4 mr-2 rounded transition-all"
                            >
                                Add New Course
                            </button>
                        </>
                    }
                </div>
            )
            }
        </div >
    )
}

export default Profile
