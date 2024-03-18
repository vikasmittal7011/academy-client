import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import payment from "../../utils/payment";
import { inputClass, labelClass } from "../../constant/index";
import { validateReferCodeAsync } from "../../features/user/userSlice";
import { paymentIntentAync, selectrazor } from "../../features/razor/razorSlice";

const Form = ({ referCode, course, user, validReferCode }) => {

    const [amount, setAmount] = useState();

    const { data } = useSelector(selectrazor);

    const dispatch = useDispatch();

    const { register, watch, reset, handleSubmit } = useForm();
    const watchReferCode = watch("referCode")

    const varifyReferCode = () => {
        if (watchReferCode) {
            dispatch(validateReferCodeAsync({ referCode: watchReferCode }))
        }
    };

    const onSubmit = handleSubmit((data) => {
        handleOnlinePayment();
    })

    const getTotalAmount = () => {
        let amount = course.fees;
        if (watchReferCode && validReferCode) {
            amount = Math.round(course?.fees * (1 - 10 / 100))
        }
        setAmount(amount)
    }

    const handleOnlinePayment = async () => {
        dispatch(paymentIntentAync({ totalAmount: amount }))
    }

    useEffect(() => {
        if (data.success) {
            const callback_url = `${process.env.REACT_APP_URL}course/enroll?courseId=${course.id}&totalPrice=${amount}&referCode=${referCode || ""}`
            const { key } = data;
            payment(callback_url, key, data, user, course)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.success]);

    useEffect(() => {
        reset({ referCode: referCode })
    }, [referCode, reset]);

    useEffect(() => {
        if (watch("numberOfSeat")) {
            reset({ numberOfSeat: 1 })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getTotalAmount()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validReferCode]);


    return (
        <form onSubmit={onSubmit} className="flex flex-col">

            <label className={labelClass}>
                Refer Code
                <input {...register("referCode")} className={`${inputClass} ${watchReferCode && validReferCode && "border-green-500 oultine-green-500"}`} />
            </label>
            <p onClick={varifyReferCode} className="underline my-1 cursor-pointer">Verify</p>

            <p>Total Price {amount}</p>

            <button className="bg-blue-500 hover:bg-blue-700 text-white transition outline-none w-full py-2 px-4 textlg mt-5 rounded-md">Enroll Me/Payement</button>

        </form>
    )
}

export default Form
