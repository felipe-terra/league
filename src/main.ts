import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('League Accounts API')
    .setDescription('API para e-commerce de contas de League of Legends')
    .setVersion('1.0')
    .addTag('users')
    .addTag('accounts')
    .addTag('orders')
    .addTag('auth')
    .addTag('accounts')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
