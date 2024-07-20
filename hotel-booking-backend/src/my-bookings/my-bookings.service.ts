import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Hotel } from "src/models/hotel.model";


@Injectable()
export class MyBookingsService {
        constructor(
                @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
        ) {}
        
        async getMyBookings(userId: string) {
                const hotels = await this.hotelModel.find(
                        {
                                bookings: {
                                        $elemMatch: {
                                                userId:userId
                                        }
                                }
                        }
                )

                if (hotels.length === 0) { 
                        throw new HttpException('No bookings found', 404)
                }

                const myHotelBookings = hotels.map((hotel, index) => {
                        const userBookings = hotel.bookings.filter((booking) => {
                                return booking.userId === userId
                        })
                        const hotelWithUserBookings = {
                                ...hotel.toObject(),
                                bookings: userBookings,
                        };

                        return hotelWithUserBookings;
                })

                if (!myHotelBookings) { 
                        throw new HttpException('No bookings found', 404)
                }


                return myHotelBookings
        }
}