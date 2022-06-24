import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ApiModule} from "./api/api.module";


const url = process.env.MONGO_URL || 'localhost';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forRoot(`mongodb://${url}:27017/tracker`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
