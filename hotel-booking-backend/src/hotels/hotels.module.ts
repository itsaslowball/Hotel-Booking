import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { HotelController } from "./hotels.controller";
import { HotelService } from "./hotels.service";
import { MongooseModule } from "@nestjs/mongoose";
import { HotelSchema } from "src/models/hotel.model";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { ConfigModule } from "@nestjs/config";

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                }),
                MongooseModule.forFeature([
                        { name: 'Hotel', schema: HotelSchema }
                ])
        ],
        controllers: [HotelController],
        providers: [HotelService],
})

export class HotelModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
                consumer.apply(AuthMiddleware).forRoutes({
                        path: 'api/hotels/*', // This will apply to all routes under 'api/hotels'
                        method: RequestMethod.POST,
                });
        }
}