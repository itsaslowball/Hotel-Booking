import { useFormContext } from "react-hook-form"
import { hotelTypes } from "../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm";

export const TypeSection = () => {
    const { register, watch , formState:{errors}} = useFormContext<HotelFormData>();
    const typeWatch = watch("type");


    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type, index) => (
                    <label className={
                        typeWatch === type
                            ? "curson-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                            : "curson-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
                    }
                    key={index}
                    >
                        <input type="radio" value={type} {...register("type", {
                            required: "This field is required"
                        })}
                            className="hidden"
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-500 tex-sm font-bold">{errors.type.message}</span> 
            )}
        </div>
    )
}
