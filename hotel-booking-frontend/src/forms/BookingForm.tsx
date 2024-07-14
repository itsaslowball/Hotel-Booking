import { useForm } from "react-hook-form";
import { UserType } from "../../../hotel-booking-backend/src/shared/types"


type Props = {
        currentUser: UserType;
}
export type BookingFormData = {
        firstName: string;
        lastName: string;
        email: string;
}

export const BookingForm = ({currentUser}:Props) => {
        const { register } = useForm<BookingFormData>({
                defaultValues: {
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        email: currentUser.email
                }
        });
        
        return (
                <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
                        <span className="text-3xl font-bold">Confirm Your Details</span>
                        <div className="grid grid-cols-2 gap-6">
                                <label className="text-gray-700 text-sm font-bold flex-1">
                                        First Name 
                                        <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
                                                type="text"
                                                readOnly
                                                disabled
                                                {...register("firstName")}
                                        />
                                </label>

                                <label className="text-gray-700 text-sm font-bold flex-1">
                                        Last Name
                                        <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
                                                type="text"
                                                readOnly
                                                disabled
                                                {...register("lastName")}
                                        />
                                </label>

                                <label className="text-gray-700 text-sm font-bold flex-1">
                                        Email
                                        <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
                                                type="email"
                                                readOnly
                                                disabled
                                                {...register("email")}
                                        />
                                </label>
                        </div>
                </form>
        )
}