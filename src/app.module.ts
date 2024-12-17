import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsStartGateway } from './ws.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaClient, WsStartGateway],
})
export class AppModule { }
