import { Body, Controller, Post, UseInterceptors, UploadedFiles, HttpStatus, HttpCode, Request } from '@nestjs/common';
import { MyHotelsService } from './MyHotels.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { HotelDto } from 'src/dtos/hotel.dto';
import { ValidateHotelDtoPipe } from 'src/pipes/ValidateHotelDto.pipe';
// import { Request } from 'express';

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
                @Body() newHotel: any,
                @Request() req: any,
        ) {
                console.log("Request: ", req.userId)
                console.log("Adding hotel: ", newHotel);
                try{
                        return this.myHotelsService.addHotel(imageFiles, newHotel, req.userId);
                }
                catch(e){
                        console.log("Error creating hotel: ", e);
                }
        }
}