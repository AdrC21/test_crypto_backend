import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('CryptoBanking')
    .setDescription('API REST que sirve como backend para una plataforma web de compraventa de criptomonedas. La API esta protegida mediante autenticación JWT y permite operaciones CRUD básicas sobre criptomonedas y monedas fiduciarias.')
    .setVersion('1.0')
    .addTag('HMDLL')
    
    .addBasicAuth({ 
      description: 'Por favor, ingrese el token en el siguiente formato: Bearer <JWT>',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    },
    'Authorization',)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
