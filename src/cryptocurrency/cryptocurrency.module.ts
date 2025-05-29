import { Module } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Criptomoneda } from './entities/cryptocurrency.entity';
import { Moneda } from 'src/currency/entities/currency.entity';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Criptomoneda, Moneda])
  ],
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
})
export class CryptocurrencyModule {}
