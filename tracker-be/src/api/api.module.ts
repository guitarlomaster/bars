import {Module} from "@nestjs/common";

import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {VehicleModule} from "./vehicle/vehicle.module";


@Module({
  imports: [
    AuthModule,
    UserModule,
    VehicleModule
  ]
})
export class ApiModule {}
