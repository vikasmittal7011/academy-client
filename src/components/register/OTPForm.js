import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { registerUserAync, retypeData, selectauth } from "../../features/auth/authSlice"
import { ClipLoader } from "react-spinners"
import { inputClass, labelClass, scrollToTop } from "../../constant"

const OTPForm = () => {


    const { userData, status } = useSelector(selectauth);

    const dispatch = useDispatch();

    const handleClick = () => {
        scrollToTop();
        dispatch(retypeData());
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        dispatch(registerUserAync({ ...userData, ...data }));
    })



    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Verify OTP</h2>
            <label className={labelClass}>Enter OTP
                <input {...register("otp", { required: "Pleace Enter First Name...", minLength: { value: 6, message: "OTP Should be 6 Digit" }, maxLength: { value: 6, message: "OTP Should be 6 Digit" } })} className={inputClass} />
                {errors.otp && <span className="text-red-500">{errors.otp.message}</span>}
            </label>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
                <span onClick={handleClick} className="cursor-pointer underline text-blue-600 hover:text-cyan-800">Enter Email Again</span>
                <button type="submit" className={`outline-none bg-blue-700 text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                    <ClipLoader size={20} color="white" loading={status === "loading"} />
                    <div>Verify OTP</div>
                </button>
            </div>
        </form>
    )
}

export default OTPForm
