import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AtGuard } from './common/guards/at.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const reflector = new Reflector();
  app.useGlobalGuards(new AtGuard(reflector));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TODO Api')
    .setDescription('Simple Api for TODO App')
    .setVersion('1.0')
    .addBearerAuth({
      description: "Please enter token in following format: eyJhbGbyH0.jA...",
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    }, "Authorization")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
