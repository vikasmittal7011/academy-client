import { Controller, useFormContext } from "react-hook-form"
import { inputClass, labelClass } from "../../constant"
import Heading from "../common/Heading";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import Speakers from "./Speaker";
import Location from "./Location";

const Details = () => {

    const { register, formState: { errors }, control } = useFormContext();

    return (
        <div className="flex flex-col gap-5">
            <Heading heading="Add New Event" />

            <Speakers />

            <Heading heading="Details" />

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
                    {...register("description", {
                        required: "This field is require..."
                    })}
                    className={inputClass} />
                {errors.description &&
                    <span className="text-red-500">{errors.description.message}</span>
                }
            </label>

            <div className="grid base:grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label className={labelClass}>Start Date</label>
                    <Controller
                        {...register("endDate", { required: 'This field is required...' })}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value instanceof Date ? field.value : null}
                                onChange={date => field.onChange(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className={inputClass}
                                wrapperClassName="min-w-full"
                                placeholderText="End Date"
                            />
                        )}
                    />
                    {errors.startDate &&
                        <span className="text-red-500 font-bold text-xl">{errors.startDate.message}</span>
                    }
                </div>

                <div className="flex flex-col">
                    <label className={labelClass}>End Date</label>
                    <Controller
                        {...register("endDate", { required: 'This field is required...' })}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value instanceof Date ? field.value : null}
                                onChange={date => field.onChange(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className={inputClass}
                                wrapperClassName="min-w-full"
                                placeholderText="End Date"
                            />
                        )}
                    />
                    {errors.endDate &&
                        <span className="text-red-500 font-bold text-xl">{errors.endDate.message}</span>
                    }
                </div>
            </div>

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

            <Location />

        </div>
    )
}

export default Details
