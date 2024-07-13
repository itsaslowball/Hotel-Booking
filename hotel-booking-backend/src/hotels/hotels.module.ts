import { Module } from "@nestjs/common";
import { HotelController } from "./hotels.controller";
import { HotelService } from "./hotels.service";
import { MongooseModule } from "@nestjs/mongoose";
import { HotelSchema } from "src/models/hotel.model";

@Module({
        imports: [
                MongooseModule.forFeature([
                        { name: 'Hotel', schema: HotelSchema }
                ])
        ],
        controllers: [HotelController],
        providers: [HotelService],
})

export class HotelModule { };