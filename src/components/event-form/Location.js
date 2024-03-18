import { useFormContext } from "react-hook-form";

import Heading from "../common/Heading";
import { inputClass, labelClass } from "../../constant";

const Location = () => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-6">
            <Heading heading="Address" />

            <div className="grid gap-4">
                <label className={labelClass}>
                    Address Line
                    <input {...register("location.address", { required: "This field is require..." })} className={inputClass} />
                    {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <label className={labelClass}>
                    State
                    <input {...register("location.state", { required: "This field is require..." })} className={inputClass} />
                    {errors.state && <span className="text-red-500">{errors.state.message}</span>}
                </label>
                <label className={labelClass}>
                    Zip Code
                    <input type="number" {...register("location.zipCode", { required: "This field is require..." })} className={inputClass} />
                    {errors.zipCode && <span className="text-red-500">{errors.zipCode.message}</span>}
                </label>
            </div>

            <div className="grid md:grid-cols-1 gap-4">
                <label className={labelClass}>
                    Country
                    <input {...register("location.country", { required: "This field is require..." })} className={inputClass} />
                    {errors.country && <span className="text-red-500">{errors.country.message}</span>}
                </label>

                <label className={labelClass}>
                    Map Location
                    <input type="text" {...register("location.mapLocation", { required: "This field is require..." })} className={inputClass} />
                    {errors.mapLocation && <span className="text-red-500">{errors.mapLocation.message}</span>}
                </label>
            </div>
        </div>
    )
}

export default Location
