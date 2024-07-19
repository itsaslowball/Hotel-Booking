import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, PaymentIntentResponse, UserType } from "../../hotel-booking-backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const registerData: Partial<RegisterFormData> = {
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
  };
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {

  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to save hotel");
  }
  const res = await response.json();
  return res;
}

export const fetchMyHotels = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method:"GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get hotels");
  }
  return response.json();
}

export const fetchMyHotelById = async (hotelId: string) => { 
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get hotel");
  }
  return response.json();
}

export const updateMyHotel = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${formData.get("hotelId")}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update hotel");
  }

  return response.json();
}

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams):Promise<HotelSearchResponse> => { 
  const queryParams = new URLSearchParams();
  
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  })
  searchParams.types?.forEach((type) => { 
    queryParams.append("types", type);
  });
  searchParams.stars?.forEach((star) => { 
    queryParams.append("stars", star);
  });

  const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
    method: "GET",
    credentials: "include",
  });

  if(!response.ok) {
    throw new Error("Failed to search hotels");
  }

  return response.json();
}

export const fetchHotelById = async (hotelId: string) => { 
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get hotel");
  }
  return response.json();
}

export const fetchCurrentUser = async ():Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get current user");
  }

  return response.json();
}

export const createPaymentIntent = async (hotelId: string, numberOfNights: number):Promise<PaymentIntentResponse> => { 
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/booking/payment-intent`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numberOfNights }),
  });

  if (!response.ok) {
    throw new Error("Failed to create payment intent");
  }

  return response.json();
}


export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }
}