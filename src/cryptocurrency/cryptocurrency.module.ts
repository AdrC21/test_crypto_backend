import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Criptomoneda } from './entities/cryptocurrency.entity';
import { Moneda } from 'src/currency/entities/currency.entity';
import { CurrencyModule } from 'src/currency/currency.module';
import { MiddlewareMiddleware } from 'src/common/middleware/middleware.middleware';

@Module({
  imports:[
    TypeOrmModule.forFeature([Criptomoneda, Moneda])
  ],
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
})
export class CryptocurrencyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareMiddleware).forRoutes(CryptocurrencyController)
  }
}
