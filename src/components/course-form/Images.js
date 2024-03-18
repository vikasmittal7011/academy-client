import { useRef } from "react";
import { useFormContext } from "react-hook-form"
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";

import Heading from "../common/Heading"
import { inputClass } from "../../constant"


const Images = ({ images, setImages, error, setError }) => {

    const imgClickRef = useRef()

    const { register, setValue, watch } = useFormContext();

    const handleRefClick = () => {
        imgClickRef.current.click();
    }

    const removeImage = () => {
        setImages("")
    }

    const handleImageChange = e => {
        setError("")
        const files = e.target.files;

        Array.from(files).forEach(file => {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(reader.result);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleClick = async () => {
        setError("")
        if (watch("img")) {
            try {
                const response = await fetch(watch("img"))
                const blob = await response.blob();

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(reader.result)
                };
                reader.readAsDataURL(blob);
            } catch (Err) {
            }

        }
        setValue("img", "")
    }

    return (
        <div className="flex flex-col gap-3">
            <Heading heading="Images" />
            <div className="flex items-center justify-center gap-2">
                <input type='text' {...register("img")} className={`${inputClass} block w-full mt-0`} />
                <button type="button" onClick={handleClick} className="md:w-28 w-32 bg-gray-500 px-3 py-3 rounded-md transition-all hover:bg-gray-700 hover:text-white">Add This</button>
            </div>
            <div className="grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">

                {images &&
                    <div className="h-32 flex gap-5 relative">
                        <img src={images} alt="" className="rounded-2xl object-cover w-full" />
                        <div onClick={removeImage} className="absolute bg-gray-700 text-white rounded-md right-2 bottom-2 cursor-pointer px-2 py-1 opacity-75">
                            <TrashIcon className="w-5 h-5" />
                        </div>
                    </div>
                }

                <input type="file" multiple className="hidden" ref={imgClickRef} onChange={handleImageChange} />
                <button type="button" onClick={handleRefClick} className="border bg-transparent rounded-2xl p-8 text-gray-600 text-2xl flex justify-center items-center gap-1">
                    <ArrowUpTrayIcon className="w-8 h-8" />
                    Upload
                </button>
            </div>
            {error && <span className="text-red-500 font-bold text-lg">{error}</span>}
        </div>
    )
}

export default Images
