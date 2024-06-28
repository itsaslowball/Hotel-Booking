import { Module } from "@nestjs/common";
import { MyHotelsController } from "./MyHotels.controller";
import { MyHotelsService } from "./MyHotels.service";

Module({
        imports: [
        // Import the MyHotelsModule
                
        ],
        controllers: [MyHotelsController],
        providers: [MyHotelsService]
})
export class MyHotelsModule {};