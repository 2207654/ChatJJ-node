import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  //  全局配置跨域
  app.enableCors({
  });
  app.useWebSocketAdapter(new WsAdapter(app));


  await app.listen(process.env.PORT ?? 1920);
}
bootstrap();
