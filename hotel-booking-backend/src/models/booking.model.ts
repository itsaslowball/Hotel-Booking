import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {

        @Prop({ required: true })
        userId: string;

        @Prop({ required: true })
        firstName: string;

        @Prop({ required: true })
        lastName: string;

        @Prop({ required: true })
        email: string;

        @Prop({ required: true })
        adultCount: number;

        @Prop({ required: true })
        childCount: number;

        @Prop({ required: true })
        checkIn: Date;

        @Prop({ required: true })
        checkOut: Date;

        @Prop({ required: true })
        totalCost: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

