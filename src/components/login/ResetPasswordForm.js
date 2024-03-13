import { useForm } from "react-hook-form";
import { inputClass, labelClass } from "../../constant"
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { passwrodResetAync } from "../../features/auth/authSlice";

const ResetPasswordForm = ({ status }) => {

    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((data) => {
        dispatch(passwrodResetAync({ ...data, token }))
    })

    return (
        <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create Your Password</h2>

            <label className={labelClass}>Password
                <input type="password" {...register("password", {
                    required: "Pleace Enter Password...", minLength: { value: 8, message: "Password Must Be 8 Char Long" }, pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
                    }
                })} className={inputClass} />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </label>

            <label className={labelClass}>Confirm Password
                <input type="password" {...register("confirmPassword", { validate: (val) => { if (!val) { return "Place Same Password..." } else if (watch("password") !== val) { return "Your password dose not match" } } })} className={inputClass} />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </label>

            <div className="flex flex-col md:flex-row justify-end md:items-center gap-5">
                <button type="submit" className={`bg-blue-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                    <ClipLoader size={20} color="white" loading={status === "loading"} />
                    <div>Reset Password</div>
                </button>
            </div>
        </form>
    )
}

export default ResetPasswordForm
