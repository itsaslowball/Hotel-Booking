import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Hotel } from "src/models/hotel.model";
import Stripe from 'stripe'
import { Booking } from "src/models/booking.model";
import { BookingType } from "src/shared/types";

// const stripe = new Stripe("sk_test_51PcXmZG0RbPUYkvJGnYvTZi7FF0LJBuO5v6aAyg98yFlgPkIMOumAzj0K2XD2I0zmfpLvtrTc3K0vyQTNZlCXmxj009C2kvys2")
// import Stripe from 'stripe';
console.log("process", process.env)
// console.log("process", process.env.STRIPE_API_KEY)
@Injectable()
export class HotelService {
        constructor(
                @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
                // @InjectModel(Booking.name) private bookingModel: Model<Booking>
        ) { }

        async searchHotels(constructedQuery: any, sortOption: any, pageSize: number, skip: number) {
                try {
                        const hotels = await this.hotelModel
                                .find(constructedQuery)
                                .sort(sortOption)
                                .limit(pageSize)
                                .skip(skip)
                                .exec();

                        const totalHotels: number = await this.hotelModel.countDocuments(constructedQuery);
                        return { hotels, totalHotels };
                }
                catch (e) {
                        throw new HttpException(e.message, e.status);
                }

        }

        async getHotelById(hotelId: string) {
                try {
                        const hotel = await this.hotelModel.findById(hotelId);
                        return hotel;
                }
                catch (e) {
                        throw new HttpException(e.message, e.status);
                }
        }

        async createPaymentIntent(hotelId: string, userId: string, numberOfNights: number) {
                console.log("process", process.env.CLOUDINARY_CLOUD_NAME)
                console.log("process2", process.env.STRIPE_API_KEY)
                const stripe = new Stripe(process.env.STRIPE_API_KEY, { apiVersion: "2024-06-20" });


                const hotel = await this.getHotelById(hotelId);
                if (!hotel) {
                        throw new HttpException('Hotel not found', 404);
                }
                const totalCost = hotel.pricePerNight * numberOfNights;
                console.log("hello")
                const paymentIntent = await stripe.paymentIntents.create({
                        amount: totalCost * 100,
                        currency: 'usd',
                        metadata: {
                                hotelId: hotelId,
                                userId: userId,
                        },
                        description: `Booking for ${hotel.name}`
                });
                if (!paymentIntent.client_secret) {
                        throw new HttpException('Error creating payment intent', 500);
                }
                const response = {
                        paymentIntentId: paymentIntent.id,
                        clientSecret: paymentIntent.client_secret.toString(),
                        totalCost: totalCost
                }
                return response;
        }

        async createBooking(hotelId: string, userId: string, paymentIntentId: string, body: any) {
                const stripe = new Stripe(process.env.STRIPE_API_KEY, { apiVersion: "2024-06-20" });

                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);
                if (!paymentIntent) {
                        throw new HttpException('Payment intent not found', 404);
                }
                if (paymentIntent.metadata.userId !== userId || paymentIntent.metadata.hotelId !== hotelId) {
                        throw new HttpException('Payment intent mismatch', 401);
                }

                if (paymentIntent.status !== 'succeeded') {
                        throw new HttpException('Payment intent not successful', 400);
                }

                const newBooking: BookingType = {
                        ...body,
                        userId
                }

                const hotel = await this.hotelModel.findByIdAndUpdate(hotelId, {
                        $push: {
                                bookings: newBooking
                        },

                        new: true

                })

                if (!hotel) {
                        throw new HttpException('Hotel not found', 404);
                }
        }
}