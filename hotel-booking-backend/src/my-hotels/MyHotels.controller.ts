import { Body, Controller, Post, UseInterceptors, UploadedFiles, HttpStatus, HttpCode, Request, HttpException, Get } from '@nestjs/common';
import { MyHotelsService } from './MyHotels.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import {  HotelRequestDto } from 'src/dtos/hotel.dto';
import { ValidateHotelDtoPipe } from 'src/pipes/ValidateHotelDto.pipe';
import { Request as Req } from 'express';

const storage = multer.memoryStorage();

const upload = {
        storage: storage,
        limits: {
                fileSize: 5 * 1024 * 1024, // 5 MB
        },
};

@Controller('api/my-hotels')
export class MyHotelsController {
        constructor(private myHotelsService: MyHotelsService) { }

        
        @Post('/')
        @HttpCode(HttpStatus.CREATED)
        @UseInterceptors(FilesInterceptor('imageFiles', 6, upload))
        async addHotel(
                @UploadedFiles() imageFiles: Array<Express.Multer.File>,
                @Body() newHotel: HotelRequestDto,
                @Request() req: Req,
        ) {
                try{
                        return this.myHotelsService.addHotel(imageFiles, newHotel, req.userId);
                }
                catch(e){
                        console.log("Error creating hotel: ", e);
                        throw new HttpException("Error creating hotel", 500);
                }
        }

        @Get('/')
        async getHotels(@Request() req: Req) {
                try {
                        const userId = req.userId;
                        return this.myHotelsService.getHotels(userId);
                }
                catch(e){
                        console.log("Error getting hotels: ", e);
                        throw new HttpException(e.message || 'Error getting hotels', 500);
                }
        }
}