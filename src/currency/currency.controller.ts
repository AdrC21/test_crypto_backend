import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Global } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { ApiBasicAuth } from '@nestjs/swagger';


@Controller('moneda')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiBasicAuth('Authorization')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @ApiBasicAuth('Authorization')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.currencyService.findAll();
  }

}
