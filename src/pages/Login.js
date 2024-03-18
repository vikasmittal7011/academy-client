import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { scrollToTop } from "../constant";
import Toast from "../components/common/Toast";
import LoginForm from "../components/login/LoginForm";
import { clearMessage, selectauth } from "../features/auth/authSlice";
import ResetPasswordForm from "../components/login/ResetPasswordForm";
import ForgetPasswordForm from "../components/login/ForgetPasswordForm";

const Login = () => {

    const { token } = useParams();

    const [forgetPassword, setForgetPassword] = useState(false);

    const navigate = useNavigate()

    const { status, message, loginSuccess, passwordReset } = useSelector(selectauth);

    const handleForgetPasswordState = () => {
        scrollToTop();
        setForgetPassword(!forgetPassword)
    }

    useEffect(() => {
        if (loginSuccess) {
            navigate("/")
        }
    }, [loginSuccess, navigate]);

    useEffect(() => {
        if (passwordReset) {
            navigate("/login")
        }
    }, [passwordReset, navigate]);

    return (
        <>
            <Toast type={status === "failed" ? "error" : "success"} message={message} clearMessage={clearMessage} />
            {
                token === undefined ?
                    !forgetPassword ?
                        <LoginForm handleForgetPasswordState={handleForgetPasswordState} status={status} />
                        :
                        <ForgetPasswordForm handleForgetPasswordState={handleForgetPasswordState} status={status} />
                    : <ResetPasswordForm status={status} />
            }
        </>
    )
}

export default Login
