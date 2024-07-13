import { Controller, Get, HttpException, Query } from "@nestjs/common";
import { HotelService } from "./hotels.service";
import { HotelSearchResponse } from "src/shared/types";

@Controller('api/hotels')
export class HotelController {
        constructor(
                private hotelService: HotelService
        ) { }

        @Get('/')
        async _check() {
                const route = 'api/hotels';
                return route;
        }


        @Get('/search')
        async searchHotels(@Query() query: any) {

                try {
                        const constructedQuery = this.constructSearchQuery(query);
                        let sortOption = {};
                        switch (query.sortOption) { 
                                case "starRating":
                                        sortOption = { starRating: -1 }
                                        break;
                                case "pricePerNightAsc":
                                        sortOption = { pricePerNight: 1 }
                                        break;
                                case "pricePerNightDesc":
                                        sortOption = { pricePerNight: -1 }
                                        break;
                        }

                        const page = query.page;
                        const pageSize = 5;
                        const pageNumber = parseInt(page) || 1;
                        const skip = (pageNumber - 1) * pageSize;
                        const { hotels, totalHotels } = await this.hotelService.searchHotels(constructedQuery, sortOption, pageSize, skip);

                        const response = {
                                data: hotels,
                                pagination: {
                                        total: totalHotels,
                                        page: pageNumber,
                                        pages: Math.ceil(totalHotels / pageSize)
                                }
                        }

                        return response
                }
                catch (e) {
                        console.log(e);
                        throw new HttpException(e.message, e.status);
                }
        }


        constructSearchQuery = (query: any) => {
                let constructedQuery: any = {};
                if (query.destination) {
                        constructedQuery.$or = [
                                { city: new RegExp(query.destination, 'i') },
                                { country: new RegExp(query.destination, 'i') }
                        ];
                }
                if (query.adultCount) {
                        constructedQuery.adultCount = {
                                $gte: parseInt(query.adultCount)
                        }
                }
                if (query.childCount) {
                        constructedQuery.childCount = {
                                $gte: parseInt(query.childCount)
                        }
                }
                if (query.facilities) {
                        constructedQuery.facilities = {
                                $all: Array.isArray(query.facilities) ? query.facilities : [query.facilities]
                        }
                }
                if (query.types) {
                        constructedQuery.type = {
                                $in: Array.isArray(query.types) ? query.types : [query.types]
                        }
                }
                if (query.stars) {
                        const starRating = Array.isArray(query.stars) ? query.stars.map((star: string) => parseInt(star)) : [parseInt(query.stars)];

                        constructedQuery.starRating = {
                                $in: starRating
                        }
                }
                if (query.maxPrice) {
                        constructedQuery.pricePerNight = {
                                $lte: parseInt(query.maxPrice).toString()
                        }
                }

                return constructedQuery;
        }
}