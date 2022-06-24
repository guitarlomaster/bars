import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

import {CreateVehicleDto} from "../api/vehicle/dto/create-vehicle.dto";
import {Vehicle, VehicleDocument} from "../schemas";
import {UpdateVehicleDto} from "../api/vehicle/dto/update-vehicle.dto";
import {DateTime} from "luxon";


@Injectable()
export class VehicleService {
  constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>) {
  }

  async createOne(createVehicleDto: CreateVehicleDto, userId: string): Promise<VehicleDocument> {
    const createdVehicle = new this.vehicleModel({
      ...createVehicleDto,
      userId
    });
    return createdVehicle.save();
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleModel.findByIdAndUpdate(id, updateVehicleDto).exec();
  }

  async getOne(id: string, userId: string): Promise<VehicleDocument> {
    const vehicles = await this.vehicleModel.find({userId}).exec();
    return vehicles.find(v => v.id === id);
  }

  getAll(userId: string): Promise<VehicleDocument[]> {
    return this.vehicleModel.find({userId}).exec();
  }

  deleteMany(ids: string[], userId: string): Promise<any> {
    return this.vehicleModel
      .updateMany(
        {
          _id: { $in: ids },
          userId
        },
        {
          $set: { deleteDate: DateTime.now().toString() }
        }
      )
      .exec();
  }
}
