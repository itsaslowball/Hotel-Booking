import { IsDate, IsNotEmpty, IsNumber, IsString, Max, Min, max, min } from "class-validator";


export class HotelDto {
        @IsString()
        userId: string;

        @IsString()
        @IsNotEmpty()
        name: string;

        @IsString()
        @IsNotEmpty()
        city: string;

        @IsString()
        @IsNotEmpty()
        country: string;

        @IsString()
        @IsNotEmpty()
        description: string;

        @IsString()
        @IsNotEmpty()
        type: string;

        @IsNumber()
        @IsNotEmpty()
        adultCount: number;

        @IsNumber()
        @IsNotEmpty()
        childCount: number;

        @IsString({ each: true })
        @IsNotEmpty()
        facilities: string[];

        @IsNumber()
        @IsNotEmpty()
        pricePerNight: number;

        @IsNumber()
        @IsNotEmpty()
        @Min(1)
        @Max(5)
        starRating: number;

        @IsString({ each: true })
        imageUrls: string[];

        @IsDate()
        lastUpdated: Date;
}