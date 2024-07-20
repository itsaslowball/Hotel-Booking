import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './Users/Users.module';
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import { MyHotelsModule } from './my-hotels/MyHotels.module';
import { HotelModule } from './hotels/hotels.module';
import { MyBookingsModule } from './my-bookings/my-bookings.module';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MyHotelsModule,
    HotelModule,
    MyBookingsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'hotel-booking-frontend', 'dist'),
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
