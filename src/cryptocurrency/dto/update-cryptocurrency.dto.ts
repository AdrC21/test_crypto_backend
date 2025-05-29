import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptocurrencyDto } from './create-cryptocurrency.dto';
import { IsString, IsOptional, IsArray, ArrayMinSize } from 'class-validator';


export class UpdateCryptocurrencyDto extends PartialType(CreateCryptocurrencyDto) {}
