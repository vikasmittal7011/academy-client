import { useForm } from "react-hook-form";
import { inputClass, labelClass } from "../../constant/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentIntentAync, selectrazor } from "../../features/razor/razorSlice";
import { validateReferCodeAsync } from "../../features/user/userSlice";
import payment from "../../utils/payment";

const Form = ({ referCode, event, user, validReferCode }) => {

    const [amount, setAmount] = useState();

    const { data } = useSelector(selectrazor);

    const dispatch = useDispatch();

    const { register, formState: { errors }, watch, reset, handleSubmit } = useForm();

    const watchReferCode = watch("referCode")

    const varifyReferCode = () => {
        if (watchReferCode) {
            dispatch(validateReferCodeAsync({ referCode: watchReferCode }))
        }
    };

    const onSubmit = handleSubmit((data) => {
        handleOnlinePayment();
    })

    useEffect(() => {
        if (data.success) {
            const callback_url = `${process.env.REACT_APP_URL}event/enroll?eventId=${event.id}&totalPrice=${amount}&referCode=${referCode || ""}&numberOfSeat=${watch("numberOfSeat")}`
            const { key } = data;
            payment(callback_url, key, data, user, event)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.success]);


    const handleOnlinePayment = async () => {
        dispatch(paymentIntentAync({ totalAmount: amount }))
    }

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

    const getTotalAmount = () => {
        console.log(watchReferCode, validReferCode)
        let amount = event.fees;
        if (watchReferCode && validReferCode) {
            amount = Math.round(event?.fees * (1 - 10 / 100))
        }
        setAmount(amount)
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col">
            <label className={labelClass}>
                Number Of Seat
                <input value={1} type="number" min={1} max={10} {...register("numberOfSeat", { required: "This fiels is require..." })} className={inputClass} />
                {errors.numberOfSeat && <span className="text-red-500">{errors.numberOfSeat.message}</span>}
            </label>

            <label className={labelClass}>
                Refer Code
                <input {...register("referCode")} className={`${inputClass} ${watchReferCode && validReferCode && "border-green-500 oultine-green-500"}`}  />
            </label>
            <p onClick={varifyReferCode} className="underline my-1 cursor-pointer">Verify</p>

            <p>Total Price {amount}</p>

            <button className="bg-blue-500 hover:bg-blue-700 text-white transition outline-none w-full py-2 px-4 textlg mt-5 rounded-md">Enroll Me</button>

        </form>
    )
}

export default Form
