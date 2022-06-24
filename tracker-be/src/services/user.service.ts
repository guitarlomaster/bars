import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DateTime} from "luxon";

import {Session, SessionDocument, User, UserDocument, Vehicle, VehicleDocument} from "../schemas";
import {TokenCreator} from "../helpers";


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>
  ) {
  }

  async getUser(token: string): Promise<UserDocument> {
    const jwtBody = TokenCreator.getJwtBody(token);
    return this.userModel.findById(jwtBody.id);
  }

  async deleteUser(token: string): Promise<void> {
    const jwtBody = TokenCreator.getJwtBody(token);
    await this.userModel.findByIdAndUpdate(jwtBody.id, {deleteDate: DateTime.now().toString()}).exec();
    await this.vehicleModel
      .updateMany(
        { userId: jwtBody.id },
        { $set: { deleteDate: DateTime.now().toString() } }
      )
      .exec();
    await this.sessionModel.findOneAndDelete({userId: jwtBody.id}).exec();
    return;
  }

}
