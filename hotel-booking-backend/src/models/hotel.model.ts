import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Booking } from "./booking.model";

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel{

        @Prop({required:true})
        userId:string;

        @Prop({required:true})
        name:string;

        @Prop({required:true})
        city:string;

        @Prop({required:true})
        country:string;

        @Prop({required:true})
        description:string;

        @Prop({required:true})
        type:string;

        @Prop({required:true})
        adultCount:number;

        @Prop({required:true})
        childCount:number;

        @Prop({required:true, })
        facilities: string[];

        @Prop({required:true})
        pricePerNight:number;

        @Prop({required:true, min:1, max:5})
        starRating:number;

        @Prop({required:true})
        imageUrls:string[];

        @Prop({required:true})
        lastUpdated: Date;
        
        @Prop()
        bookings: Booking[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

