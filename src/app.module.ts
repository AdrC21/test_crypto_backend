import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, 
    }), UserModule, CurrencyModule, CryptocurrencyModule, CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
