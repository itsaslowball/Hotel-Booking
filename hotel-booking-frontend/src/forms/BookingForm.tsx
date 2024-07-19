import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../hotel-booking-backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../context/AppContext";


type Props = {
        currentUser: UserType;
        paymentIntent: PaymentIntentResponse;
}
export type BookingFormData = {
        firstName: string;
        lastName: string;
        email: string;
        adultCount: number;
        childCount: number;
        checkIn: string;
        checkOut: string;
        hotelId: string;
        paymentIntentId: string;
        totalCost: number;
}

export const BookingForm = ({ currentUser, paymentIntent }: Props) => {
        const stripe = useStripe();
        const elements = useElements();
        const search = useSearchContext();
        const { hotelId } = useParams();
        const {showToast} = useAppContext();

        const { mutate: bookRoom , isLoading} = useMutation(apiClient.createRoomBooking, {
                onSuccess: () => {
                        showToast({ message: "Room booked successfully", type: "SUCCESS" });
                },
                onError: () => {
                        showToast({ message: "Error saving booking", type: "ERROR" });
                }
        });

        const {handleSubmit, register } = useForm<BookingFormData>({
                defaultValues: {
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        email: currentUser.email,
                        adultCount: search.adultCount,
                        childCount: search.childCount,
                        checkIn: search.checkIn.toISOString(),
                        checkOut: search.checkOut.toISOString(),
                        hotelId: hotelId as string,
                        totalCost: paymentIntent.totalCost,
                        paymentIntentId: paymentIntent.paymentIntentId
                }
        });

        const onSubmit = async (formData: BookingFormData) => {
                console.log("formData", formData);
                if (!stripe || !elements) { 
                        return;
                }
                console.log("paymentIntent", paymentIntent);
                const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
                        payment_method: {
                                card:elements.getElement(CardElement) as StripeCardElement
                        }
                })
                console.log("result", result);

                if (result.paymentIntent?.status === 'succeeded') { 
                        bookRoom({...formData, paymentIntentId: result.paymentIntent.id});
                }
        }
        
        return (
                <form
                        onSubmit = {handleSubmit(onSubmit)}
                        className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
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

                        <div className="space-y-2">
                                <h2 className="text-xl font-semibold"> Your Price Summary</h2>
                                <div className="bg-blue-200 p-4 rounded-md">
                                        <div className="font-semibold text-lg">
                                                Total Cost: $ {paymentIntent.totalCost}
                                        </div>
                                        <div className="text-xs">Includes taxes and charges</div>
                                </div>
                        </div>

                        <div className="space-y-2">
                                <h3 className="text-xl font-semibold">Payment Details</h3>
                                <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />

                        </div>

                        <div className="flex justify-end">
                                <button
                                        disabled={isLoading}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-500" type="submit">
                                        {isLoading ? "Booking..." : "Confirm Booking"}
                                </button>
                        </div>  
                        
                </form>
        )
}