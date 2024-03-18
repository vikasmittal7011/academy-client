import { useFormContext } from "react-hook-form"

import Heading from "../common/Heading";
import { inputClass, labelClass } from "../../constant"

const Detail = () => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-5">
            <Heading heading="Add New Course" />
            <label className={labelClass}>
                Name
                <input
                    type="text"
                    {...register("name", {
                        required: "This field is require..."
                    })}
                    className={inputClass} />
                {errors.name &&
                    <span className="text-red-500">{errors.name.message}</span>
                }
            </label>

            <label className={labelClass}>
                Discription
                <textarea
                    rows={5}
                    {...register("discription", {
                        required: "This field is require..."
                    })}
                    className={inputClass} />
                {errors.discription &&
                    <span className="text-red-500">{errors.discription.message}</span>
                }
            </label>

            <label className={labelClass}>
                Eligibility
                <input
                    type="text"
                    {...register("eligibility", {
                        required: "This field is require..."
                    })}
                    className={inputClass} />
                {errors.eligibility &&
                    <span className="text-red-500">{errors.eligibility.message}</span>
                }
            </label>

            <label className={labelClass}>
                Duration
                <input
                    type="number"
                    {...register("duration", {
                        required: "This field is require..."
                    })}
                    className={inputClass} />
                {errors.duration &&
                    <span className="text-red-500">{errors.duration.message}</span>
                }
            </label>

            <label className={labelClass}>
                Fees
                <input
                    type="number"
                    {...register("fees", {
                        required: "This field is require..."
                    })}
                    className={inputClass} />
                {errors.fees &&
                    <span className="text-red-500">{errors.fees.message}</span>
                }
            </label>
        </div>
    )
}

export default Detail
