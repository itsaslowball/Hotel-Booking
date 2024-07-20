import { Body, Controller, Post, UseInterceptors, UploadedFiles, HttpStatus, HttpCode, Request, HttpException, Get, Param, Put } from '@nestjs/common';
import { MyHotelsService } from './MyHotels.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { HotelRequestDto, HotelUpdatetDto } from 'src/dtos/hotel.dto';
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
                try {
                        return this.myHotelsService.addHotel(imageFiles, newHotel, req.userId);
                }
                catch (e) {
                        throw new HttpException("Error creating hotel", 500);
                }
        }

        @Get('/')
        async getHotels(@Request() req: Req) {
                try {
                        const userId = req.userId;
                        return this.myHotelsService.getHotels(userId);
                }
                catch (e) {
                        throw new HttpException(e.message || 'Error getting hotels', 500);
                }
        }

        @Get('/:hotelId')
        async getHotelById(@Request() req: Req, @Param('hotelId') hotelId: string) {
                try {
                        const userId = req.userId;
                        return this.myHotelsService.getHotelById(userId, hotelId);
                }
                catch (e) {
                        throw new HttpException(e.message || 'Error getting hotel', 500);
                }
        }

        @Put('/:hotelId')
        @HttpCode(HttpStatus.OK)
        @UseInterceptors(FilesInterceptor('imageFiles', 6, upload))
        async updateHotel(
                @Param('hotelId') hotelId: string, @Body() updateBody: HotelUpdatetDto,
                @Request() req: Req,
                @UploadedFiles() imageFiles: Array<Express.Multer.File>,
        ) {
                try {
                        const userId = req.userId;
                        return this.myHotelsService.updateHotel(userId, hotelId, updateBody, imageFiles);
                }
                catch (e) {
                        throw new HttpException(e.message || 'Error updating hotel', 500);
                }
        }
}