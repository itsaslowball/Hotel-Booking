import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// import cloudinary from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { Model } from "mongoose";
import { HotelDto } from "src/dtos/hotel.dto";
import { Hotel } from "src/models/hotel.model";



@Injectable()
export class MyHotelsService {

        constructor(
                @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
        ) { }

        async uploadImage(imageFiles: Array<Express.Multer.File>) {
                try {
                        const uploadPromises = imageFiles.map(async (image) => {
                                const b64 = Buffer.from(image.buffer).toString('base64');
                                const dataURI = "data:" + image.mimetype + ";base64," + b64;
                                const res = await cloudinary.uploader.upload(dataURI);
                                return res.url;
                        });
                        const imageUrls = await Promise.all(uploadPromises);
                        return imageUrls;
                } catch (error) {
                        console.log("Error uploading images: ", error);
                        throw new HttpException("Error uploading images", 500);
                }
        }

        async addHotel(imageFiles: Array<Express.Multer.File>, newHotel: any, userId: string) {
                try {
                        const imageUrls = await this.uploadImage(imageFiles);
                        newHotel.imageUrls = imageUrls;
                        newHotel.lastUpdated = new Date();
                        newHotel.userId = userId;
                        const hotel = this.hotelModel.create(newHotel);
                        return hotel;
                }
                catch (e) {
                        console.log("Error creating hotel: ", e);
                        throw new HttpException("Error creating hotel", 500);
                }
        }
}