import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Hotel, HotelSchema } from "src/models/hotel.model";
import { MyBookingsController } from "./my-bookings.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { MyBookingsService } from "./my-bookings.service";


@Module({
        imports: [
                MongooseModule.forFeature([
                        { name: Hotel.name, schema: HotelSchema }
                ])
        ],
        controllers: [MyBookingsController],
        providers: [MyBookingsService],
})

export class MyBookingsModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
                consumer.apply(AuthMiddleware).forRoutes('/api/my-bookings');
        }
}