import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneda } from './entities/currency.entity';
import { MiddlewareMiddleware } from 'src/common/middleware/middleware.middleware';

@Global()
@Module({
  imports:[
      TypeOrmModule.forFeature([Moneda])
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService]
})
export class CurrencyModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareMiddleware).forRoutes(CurrencyController)
  }
}
