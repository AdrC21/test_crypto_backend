import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { Moneda } from 'src/currency/entities/currency.entity';
import { ApiBasicAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Post()
  @ApiBasicAuth('Authorization')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCryptocurrencyDto: CreateCryptocurrencyDto) {
    return this.cryptocurrencyService.create(createCryptocurrencyDto);
  }

  @Get()
  @ApiBasicAuth('Authorization')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'monedaCode', required: false, description: 'Moneda' })
  findAll(@Param('monedaCode') monedaCode?:string) {
    console.log(monedaCode)
    return this.cryptocurrencyService.findAllOrFiltered(monedaCode)
  }

  @Put(':id')
  @ApiBasicAuth('Authorization')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateCryptocurrencyDto })
  update(@Param('id') id: string, @Body() updateCryptocurrencyDto: UpdateCryptocurrencyDto) {
    return this.cryptocurrencyService.update(+id, updateCryptocurrencyDto);
  }



}
