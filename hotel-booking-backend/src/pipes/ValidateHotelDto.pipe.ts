import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { HotelDto } from '../dtos/hotel.dto';

@Injectable()
export class ValidateHotelDtoPipe implements PipeTransform {
        async transform(value: any, { metatype }: ArgumentMetadata) {
                if (!metatype || !this.toValidate(metatype)) {
                        return value;
                }
                const object = plainToInstance(metatype, value);
                const errors = await validate(object);
                if (errors.length > 0) {
                        throw new BadRequestException('Validation failed');
                }
                return object;
        }

        private toValidate(metatype: Function): boolean {
                const types: Function[] = [String, Boolean, Number, Array, Object];
                return !types.includes(metatype);
        }
}
