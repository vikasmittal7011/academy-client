import { useFormContext, useFieldArray } from "react-hook-form";
import Heading from "../common/Heading";
import { inputClass, labelClass } from "../../constant";
import { useEffect } from "react";

const Speakers = () => {

    const { control, register, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "speakers",
    });

    useEffect(() => {
        if (fields.length < 1) {
            append({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <Heading heading="Speakers" />

            {fields.map((speaker, index) => (
                <div key={speaker.id} className="grid gap-4">
                    <label className={labelClass}>
                        Speaker Name
                        <input {...register(`speakers.${index}.name`, { required: "This field is required" })} className={inputClass} />
                        {errors?.speakers?.[index]?.name && <span className="text-red-500">{errors?.speakers?.[index]?.name?.message}</span>}
                    </label>

                    <label className={labelClass}>
                        Speaker Bio
                        <textarea {...register(`speakers.${index}.bio`, { required: "This field is required" })} className={inputClass} />
                        {errors?.speakers?.[index]?.bio && <span className="text-red-500">{errors?.speakers?.[index]?.bio?.message}</span>}
                    </label>

                    <label className={labelClass}>
                        Speaker Post
                        <input {...register(`speakers.${index}.title`, { required: "This field is required" })} className={inputClass} />
                        {errors?.speakers?.[index]?.title && <span className="text-red-500">{errors?.speakers?.[index]?.title?.message}</span>}
                    </label>

                    <button className="bg-red-600 px-3 py-2 rounded-md w-fit text-white outline-none " type="button" onClick={() => remove(index)}>Remove Speaker</button>
                </div>
            ))}

            <div className="flex justify-end">
                <button className="bg-blue-600 px-3 py-2 rounded-md w-fit text-white outline-none " type="button" onClick={() => append({})}>Add Speaker</button>
            </div>
        </div>
    );
};

export default Speakers;
