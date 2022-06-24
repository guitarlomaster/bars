import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";

import {VehicleService} from "../../services";
import {VehicleController} from "./vehicle.controller";
import {Session, SessionSchema, Vehicle, VehicleSchema} from "../../schemas";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Session.name, schema: SessionSchema }
    ])
  ],
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule {

}
