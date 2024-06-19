import { Controller, Get } from "@nestjs/common";

@Controller('test')
export class AppController{
    @Get()
    _check_():object{
        return {message:"This is test route"}
    }
}