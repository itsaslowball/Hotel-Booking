import { Controller } from "@nestjs/common";
import { MyHotelsService } from "./MyHotels.service";
import * as multer from "multer"

const upload = multer.memoryStorage();


@Controller('api/my-hotels')
export class MyHotelsController{
        constructor(private myHoetelsService: MyHotelsService){}
};