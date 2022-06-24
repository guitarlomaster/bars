import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {Session, SessionSchema, User, UserSchema, Vehicle, VehicleSchema} from "../../schemas";
import {AuthService, SessionService, UserService} from "../../services";
import {LoginController} from "./controllers/login.controller";
import {RegisterController} from "./controllers/register.controller";
import {LogoutController} from "./controllers/logout.controller";
import {SessionController} from "./controllers/session.controller";
import {AuthRequestValidationPipe} from "./pipes/auth-request-validation.pipe";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: User.name, schema: UserSchema },
      { name: Vehicle.name, schema: VehicleSchema }
    ])
  ],
  controllers: [
    LoginController,
    RegisterController,
    LogoutController,
    SessionController
  ],
  providers: [
    SessionService,
    AuthService,
    AuthRequestValidationPipe,
    UserService
  ],
})
export class AuthModule {}
