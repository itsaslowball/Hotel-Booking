import { FormProvider, useForm } from "react-hook-form"
import { DetailSection } from "./DetailSection";
import { TypeSection } from "./TypeSection";
import { FacilitiesSection } from "./FacilitiesSection";
import { GuestsSection } from "./GuestsSection";
import { ImagesSection } from "./ImagesSection";
import { useEffect } from "react";

export type HotelFormData = {
  name: string,
  city: string,
  country: string,
  description: string,
  type: string,
  pricePerNight: number,
  starRating: number,
  facilities: string[],
  imageFiles: FileList,
  adultCount: number,
  childCount: number,
}

type Props = {
  hotel: any,
  onSave: (hotelFormData: FormData) => void,
  isLoading: boolean
}

export const ManageHotelForm = ({onSave, isLoading, hotel}:Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit , reset} = formMethods;
  

  useEffect(() => {
    reset(hotel);
  },[hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })

    for (let i = 0; i < formDataJson.imageFiles.length; i++) {
      formData.append('imageFiles', formDataJson.imageFiles[i]);
    }

    onSave(formData);
  })


  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button disabled={isLoading} type="submit" className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500 text-xl" >
            {isLoading?"Saving...":"Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  )
}
