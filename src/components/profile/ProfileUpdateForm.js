import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

import { inputClass, labelClass } from "../../constant";
import { selectuser, updateUserDataAsync } from "../../features/user/userSlice";

const ProfileUpdateForm = ({ isOpen = true, handleIsOpen }) => {

    const dispatch = useDispatch();

    const { user, status, updateUser } = useSelector(selectuser)

    const { register, formState: { errors }, reset, handleSubmit } = useForm();

    const onSubmit = handleSubmit((data) => {
        dispatch(updateUserDataAsync({ ...data }))
    })

    useEffect(() => {
        if (updateUser) {
            handleIsOpen()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateUser]);

    useEffect(() => {
        reset({ ...user })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="flex items-center justify-center">
            {isOpen && (
                <div className="fixed py-5 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                    <div className="bg-gray-200 rounded-lg p-6 lg:w-3/4 md:w-3/4 sm:w-3/4 l:w-full s:w-full xs:w-full l:m-5 s:m-5 xs:m-5 transform transition-transform duration-300">
                        <div className="flex justify-between items-center mb-4">

                            <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
                                <h2 className="text-3xl font-bold">Update Your Profile</h2>

                                <div className="flex flex-col md:flex-row gap-5">
                                    <label className={labelClass}>First Name
                                        <input {...register("firstName", { required: "Pleace Enter First Name..." })} className={inputClass} />
                                        {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                                    </label>

                                    <label className={labelClass}>Last Name
                                        <input {...register("lastName", { required: "Pleace Enter Last Name..." })} className={inputClass} />
                                        {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                                    </label>
                                </div>

                                <label className={labelClass}>Contact
                                    <input type='number' {...register("contact", { required: "Pleace Enter Last Name..." })} className={inputClass} />
                                    {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}
                                </label>

                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">

                                    <button type="submit" className={`bg-blue-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                                        <ClipLoader size={20} color="white" loading={status === "loading"} />
                                        <div>Update Profile</div>
                                    </button>
                                    <button onClick={handleIsOpen} type="button" className={`bg-red-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-red-500 transition-all flex justify-center items-center gap-2`}>
                                        <div>Cancel</div>
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileUpdateForm
