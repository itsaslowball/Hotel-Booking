import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { ManageHotelForm } from "../forms/ManageHotelForm";
import { useAppContext } from "../context/AppContext";

export const EditHotel = () => {
        const { hotelId } = useParams();

        const {showToast} = useAppContext();


        const { data: hotel } = useQuery(
                "fetchMyHotelById",
                () => apiClient.fetchMyHotelById(hotelId || ''),
                {
                        enabled: !!hotelId,
                }
        );

        const { mutate, isLoading } = useMutation(
                apiClient.updateMyHotel,
                {
                        onSuccess: () => {
                                showToast({ message: "Hotel updated successfully", type: "SUCCESS" });
                        },
                        onError: () => {
                                showToast({ message: "Error updating hotel", type: "ERROR" });
                        }
                }
        )

        const handleSave = (hotelFormData: FormData) => { 
                mutate(hotelFormData);
        }



        return (
                <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
        )
}
