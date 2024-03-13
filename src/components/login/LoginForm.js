import { inputClass, labelClass, scrollToTop } from "../../constant/index";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUserAync } from "../../features/auth/authSlice";


const LoginForm = ({ handleForgetPasswordState, status }) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = handleSubmit((data) => {
        dispatch(loginUserAync(data))
    })

    return (
        <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Login Into Account</h2>

            <label className={labelClass}>Email
                <input type="email" {...register("email", {
                    required: "Pleace Enter Email...", pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
                        message: "Please enter a valid email address."
                    }
                })} className={inputClass} />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </label>

            <span onClick={handleForgetPasswordState} className="text-right -mb-6 text-lg underline outline-none text-blue-600 transition-all hover:text-cyan-800 cursor-pointer">
                Forget Password?
            </span>

            <label className={labelClass}>Password
                <input type="password" {...register("password", {
                    required: "Pleace Enter Password...", minLength: { value: 8, message: "Password Must Be 8 Char Long" }, pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
                    }
                })} className={inputClass} />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </label>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
                <span className="flex gap-1">
                    Don't have an account?
                    <Link onClick={scrollToTop} to="/register" className="underline outline-none text-blue-600 transition-all hover:text-cyan-800">
                        Create One!
                    </Link>
                </span>
                <button type="submit" className={`bg-blue-700 outline-none text-white p-2 px-4 rounded-md font-bold text-xl hover:bg-blue-500 transition-all ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-2`}>
                    <ClipLoader size={20} color="white" loading={status === "loading"} />
                    <div>Login Account</div>
                </button>
            </div>
        </form>
    )
}

export default LoginForm
