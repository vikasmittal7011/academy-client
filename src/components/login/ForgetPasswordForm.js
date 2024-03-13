import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { inputClass, labelClass } from '../../constant';
import { ClipLoader } from 'react-spinners';
import { passwrodRequestAync } from '../../features/auth/authSlice';

const ForgetPasswordForm = ({ handleForgetPasswordState, status }) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = handleSubmit((data) => {
        dispatch(passwrodRequestAync(data))
    })

    return (
        <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Password Reset Requet</h2>

            <label className={labelClass}>Email
                <input type="email" {...register("email", {
                    required: "Pleace Enter Email...", pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
                        message: "Please enter a valid email address."
                    }
                })} className={inputClass} />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </label>

            <span onClick={handleForgetPasswordState} className="text-start -my-2 text-lg underline outline-none text-blue-600 transition-all hover:text-cyan-800 cursor-pointer">
                Login?
            </span>

            <div className="flex flex-col md:flex-row justify-end md:items-center gap-5">
                <button type="submit" className={`bg-blue-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                    <ClipLoader size={20} color="white" loading={status === "loading"} />
                    <div>Login Account</div>
                </button>
            </div>
        </form>
    )
}

export default ForgetPasswordForm
