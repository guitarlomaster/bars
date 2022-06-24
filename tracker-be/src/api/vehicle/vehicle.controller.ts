import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes
} from "@nestjs/common";
import {Request} from "express";

import {AuthGuard} from "../../guards";
import {CreateVehicleDto} from "./dto/create-vehicle.dto";
import {VehicleRequestValidationPipe} from "./pipes/vehicle-request-validation.pipe";
import {VehicleService} from "../../services";
import {VehicleResponse} from "../../models/vehicle.model";
import {TokenCreator} from "../../helpers";
import {SESSION_TOKEN} from "../../constants";
import {UpdateVehicleDto} from "./dto/update-vehicle.dto";
import {DeleteVehicleDto} from "./dto/delete-vehicles.dto";


@Controller('vehicles')
@UseGuards(AuthGuard)
export class VehicleController {
  constructor(private vehicleService: VehicleService) {
  }

  @Post()
  @UsePipes(VehicleRequestValidationPipe)
  async create(@Body() createVehicleDto: CreateVehicleDto, @Req() req: Request): Promise<VehicleResponse> {
    const jwtBody = TokenCreator.getJwtBody(req.cookies[SESSION_TOKEN]);

    return new VehicleResponse(
      await this.vehicleService.createOne(createVehicleDto, jwtBody.id)
    );
  }

  @Put(':id')
  @UsePipes(VehicleRequestValidationPipe)
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    try {
      await this.vehicleService.update(id, updateVehicleDto);
    } catch (e) {
      this.checkIdAbsence(e, id);

      throw null;
    }

    return new VehicleResponse({id, ...updateVehicleDto});
  }

  /**
   * @throws NotFoundException
   * @param id
   * @param req
   */
  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request): Promise<VehicleResponse> {
    let vehicle = null;

    try {
      const jwtBody = TokenCreator.getJwtBody(req.cookies[SESSION_TOKEN]);
      vehicle = await this.vehicleService.getOne(id, jwtBody.id);
    } catch (e) {
      this.checkIdAbsence(e, id);

      throw null;
    }

    if (!vehicle) {
      this.throwNotFound(id);
    }

    return new VehicleResponse(vehicle);
  }

  @Get()
  async getAll(@Req() req: Request): Promise<VehicleResponse[]> {
    const jwtBody = TokenCreator.getJwtBody(req.cookies[SESSION_TOKEN]);
    const vehicles = await this.vehicleService.getAll(jwtBody.id);

    return vehicles.filter(v => !v.deleteDate).map((v) => new VehicleResponse(v));
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<void> {
  //   await this.vehicleService.delete(id);
  //   return;
  // }

  @Delete()
  @UsePipes(VehicleRequestValidationPipe)
  async deleteMany(@Body() deleteVehicleDto: DeleteVehicleDto, @Req() req: Request): Promise<void> {
    const jwtBody = TokenCreator.getJwtBody(req.cookies[SESSION_TOKEN]);
    await this.vehicleService.deleteMany(deleteVehicleDto.ids, jwtBody.id);
    return;
  }

  /**
   * @throws NotFoundException
   * @param e
   * @param id
   * @private
   */
  private checkIdAbsence(e: any, id: string) {
    const err = e?.toJSON();

    if (err?.kind === 'ObjectId') {
      this.throwNotFound(id);
    }
  }

  /**
   * @throws NotFoundException
   * @param id
   * @private
   */
  private throwNotFound(id: string) {
    throw new NotFoundException({
      message: `Vehicle with id ${id} is not found.`
    });
  }
}
