import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MyHotelsController } from "./MyHotels.controller";
import { MyHotelsService } from "./MyHotels.service";
import { MongooseModule } from "@nestjs/mongoose";
import { HotelSchema } from "src/models/hotel.model";
import { AuthMiddleware } from "src/middlewares/auth.middleware";

@Module({
        imports: [
                MongooseModule.forFeature([
                        {name:'Hotel', schema: HotelSchema}
                ])
        ],
        controllers: [MyHotelsController],
        providers: [MyHotelsService]
})
export class MyHotelsModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
                consumer.apply(AuthMiddleware).forRoutes('api/my-hotels');
        }
}