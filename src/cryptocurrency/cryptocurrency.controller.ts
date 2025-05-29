import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { Moneda } from 'src/currency/entities/currency.entity';
import { ApiBasicAuth } from '@nestjs/swagger';

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
  findAll(@Param('monedaCode') monedaCode?:string) {
    console.log(monedaCode)
    return this.cryptocurrencyService.findAllOrFiltered(monedaCode)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptocurrencyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCryptocurrencyDto: UpdateCryptocurrencyDto) {
    return this.cryptocurrencyService.update(+id, updateCryptocurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptocurrencyService.remove(+id);
  }
}
