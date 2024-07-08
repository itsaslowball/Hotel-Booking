import { ParseIntPipe } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Max, Min, max, min } from "class-validator";


export class HotelRequestDto {

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
        @Transform(({ value }) => parseInt(value, 10))
        adultCount: number;

        @IsNumber()
        @IsNotEmpty()
        @Transform(({ value }) => parseInt(value, 10))
        childCount: number;

        @IsString({ each: true })
        @IsNotEmpty()
        facilities: string[];

        @IsNumber()
        @IsNotEmpty()
        @Transform(({ value }) => parseInt(value, 10))
        pricePerNight: number;

        @Transform(({ value }) => parseInt(value, 10))
        @IsNumber()
        @IsNotEmpty()
        @Min(1)
        @Max(5)
        starRating: number;

        @IsString({ each: true })
        @IsOptional()
        imageUrls: string[];

        @IsDate()
        @IsOptional()
        lastUpdated: Date;

        @IsString()
        @IsOptional()
        userId: string;

}

export class HotelUpdatetDto {

        @IsString()
        @IsOptional()
        name: string;

        @IsString()
        @IsOptional()
        city: string;

        @IsString()
        @IsOptional()
        country: string;

        @IsString()
        @IsOptional()
        description: string;

        @IsString()
        @IsOptional()
        type: string;

        @IsNumber()
        @IsOptional()
        @Transform(({ value }) => parseInt(value, 10))
        adultCount: number;

        @IsNumber()
        @IsOptional()
        @Transform(({ value }) => parseInt(value, 10))
        childCount: number;

        @IsString({ each: true })
        @IsOptional()
        facilities: string[];

        @IsNumber()
        @IsNotEmpty()
        @IsOptional()
        @Transform(({ value }) => parseInt(value, 10))
        pricePerNight: number;

        @Transform(({ value }) => parseInt(value, 10))
        @IsNumber()
        @IsOptional()
        @IsNotEmpty()
        @Min(1)
        @Max(5)
        starRating: number;

        @IsString({ each: true })
        @IsOptional()
        imageUrls: string[];

        @IsDate()
        @IsOptional()
        lastUpdated: Date;

        @IsString()
        @IsOptional()
        userId: string;

        @IsString()
        @IsNotEmpty()
        hotelId: string;

}