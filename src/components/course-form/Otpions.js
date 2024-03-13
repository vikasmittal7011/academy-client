import { useFormContext } from "react-hook-form"
import { labelClass } from "../../constant";

const Otpions = () => {

    const { register, formState: { errors }, watch } = useFormContext();

    const typeWatch = watch("mode")
    const typeProgrammeType = watch("programmeType")

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h1 className={labelClass}>Learning Mode</h1>
                <div className="grid grid-cols-2  gap-2">
                    {["Online", "Offline"].map((type, i) => (
                        <label key={i} className={`cursor-pointer font-semibold text-sm rounded-full px-4 py-2 ${typeWatch === type ? "bg-blue-300" : "bg-gray-300"}`} >
                            <input type='radio' value={type} {...register("mode", { required: "This field is require..." })} className="hidden" />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
                {errors.mode &&
                    <span className="text-red-500 text-xl font-bold">{errors.mode.message}</span>
                }
            </div>

            <div className="flex flex-col gap-2">
                <h1 className={labelClass}>Programme Type</h1>
                <div className="grid grid-cols-1 base:grid-cols-2 md:grid-cols-3  gap-2">
                    {["Bachlore", "Certificate", "Diploma", "Master", "Post Graduate Diploma"].map((type, i) => (
                        <label key={i} className={`cursor-pointer font-semibold text-sm rounded-full px-4 py-2 ${typeProgrammeType === type ? "bg-blue-300" : "bg-gray-300"}`} >
                            <input type='radio' value={type} {...register("programmeType", { required: "This field is require..." })} className="hidden" />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
                {errors.programmeType &&
                    <span className="text-red-500 text-xl font-bold">{errors.programmeType.message}</span>
                }
            </div>
        </div>
    )
}

export default Otpions
