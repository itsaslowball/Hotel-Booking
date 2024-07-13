import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Hotel } from "src/models/hotel.model";

@Injectable()
export class HotelService{
        constructor(
                @InjectModel(Hotel.name) private hotelModel: Model<Hotel>
        ) { }

        async searchHotels(constructedQuery: any,sortOption:any, pageSize: number, skip: number) {
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
}