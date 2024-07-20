import { Controller, Get, HttpException, Request } from "@nestjs/common";
import { MyBookingsService } from "./my-bookings.service";
import { Request as Req } from 'express';

@Controller('api/my-bookings')

export class MyBookingsController {
        constructor(
                private myBookingsService: MyBookingsService
        ) { }
        
        @Get('/')
        async getMyBookings(@Request() req: Req){
                try {
                        const userId = req.userId;
                        const hotels = await this.myBookingsService.getMyBookings(userId)
                        return hotels;

                }
                catch (e) {
                        throw new HttpException(e.message, e.status);
                }
        }
}