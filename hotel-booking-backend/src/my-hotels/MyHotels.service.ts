import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// import cloudinary from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { Model } from "mongoose";
import { HotelRequestDto, HotelUpdatetDto } from "src/dtos/hotel.dto";
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

        async addHotel(imageFiles: Array<Express.Multer.File>, newHotel: HotelRequestDto, userId: string) {
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

        async getHotels(userId: string) {
                try {
                        const hotels = await this.hotelModel.find({ userId: userId });
                        return hotels;
                }
                catch (e) {
                        console.log("Error getting hotels: ", e);
                        throw new HttpException("Error getting hotels", 500);
                }
        }

        async getHotelById(userId: string, hotelId: string) {
                try {
                        const hotel = await this.hotelModel.findOne({ userId: userId, _id: hotelId });
                        return hotel;
                }
                catch (e) {
                        console.log("Error getting hotel: ", e);
                        throw new HttpException("Error getting hotel", 500);
                }
        }

        async updateHotel(userId: string, hotelId: string, updateHotel: HotelUpdatetDto, imageFiles: Array<Express.Multer.File>) {
                try {
                        let hotelDetail = await this.getHotelById(userId, hotelId)
                        let initialImageUrls = hotelDetail.imageUrls;
                        let imgUrls = []
                        if (updateHotel.imageUrls && updateHotel.imageUrls.length > 0) {
                                imgUrls = initialImageUrls.filter((url: string) => updateHotel.imageUrls.includes(url));
                        }

                        if (imageFiles.length > 0) {
                                const imageUrls = await this.uploadImage(imageFiles);
                                let finalImageUrls = [...imgUrls, ...imageUrls]
                                updateHotel.imageUrls = finalImageUrls;
                        }
                        updateHotel.lastUpdated = new Date();
                        const hotel = await this.hotelModel.findOneAndUpdate({ userId: userId, _id: hotelId }, updateHotel, { new: true });
                        return hotel;
                }
                catch (e) {
                        console.log("Error updating hotel: ", e);
                        throw new HttpException("Error updating hotel", 500);
                }
        }

}