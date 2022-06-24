import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";

import {UserController} from "./user.controller";
import {UserService} from "../../services";
import {Session, SessionSchema, User, UserSchema, Vehicle, VehicleSchema} from "../../schemas";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Vehicle.name, schema: VehicleSchema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
