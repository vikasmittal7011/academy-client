import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Toast from "../components/common/Toast";
import OTPForm from "../components/register/OTPForm";
import RegisterForm from "../components/register/RegisterForm";
import { clearMessage, out, selectauth } from "../features/auth/authSlice";

const Register = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { sendOTP, registerSuccess, status, message } = useSelector(selectauth);

    useEffect(() => {
        if (registerSuccess) {
            dispatch(out());
            return navigate("/");
        }
    }, [registerSuccess, navigate, dispatch]);

    return (
        <>
            <Toast type={status === "failed" ? "error" : "success"} message={message} clearMessage={clearMessage} />
            {
                !sendOTP ?
                    <RegisterForm />
                    :
                    <OTPForm />
            }
        </>
    )
}

export default Register
