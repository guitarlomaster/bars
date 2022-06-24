import {ArgumentMetadata, BadRequestException, ForbiddenException, Injectable, PipeTransform} from "@nestjs/common";

import {CreateVehicleDto, createVehicleDtoKeys} from "../dto/create-vehicle.dto";
import {checkObjectKeys, filterObjectKeys} from "../../../helpers";
import {UpdateVehicleDto, updateVehicleDtoKeys} from "../dto/update-vehicle.dto";
import {DeleteVehicleDto, deleteVehicleDtoKeys} from "../dto/delete-vehicles.dto";


@Injectable()
export class VehicleRequestValidationPipe implements PipeTransform {

  /**
   * @throws BadRequestException
   * @throws ForbiddenException
   * @param value
   * @param metadata
   */
  transform(value: any, metadata: ArgumentMetadata): any {
    switch (metadata.metatype.name) {
      case CreateVehicleDto.name:
        return this.checkUpsertVehicleDto(value, createVehicleDtoKeys);
      case UpdateVehicleDto.name:
        return this.checkUpsertVehicleDto(value, updateVehicleDtoKeys);
      case DeleteVehicleDto.name:
        return this.checkDeleteVehicleDto(value, deleteVehicleDtoKeys);
      default:
        return value;
    }
  }

  /**
   * @throws BadRequestException
   * @throws ForbiddenException
   * @param dto
   * @param keys
   */
  checkDeleteVehicleDto(dto: DeleteVehicleDto, keys: string[]) {
    if (!dto.ids) {
      throw new BadRequestException({
        message: 'ids must be in request.'
      });
    } else if (checkObjectKeys(dto, keys)) {
      const k = filterObjectKeys(dto, keys);

      throw new ForbiddenException({
        message: `fields "${k.join(', ')}" are not allowed here.`
      });
    } else if (!Array.isArray(dto.ids)) {
      throw new ForbiddenException({
        message: 'ids must be an array.'
      });
    } else if (dto.ids && dto.ids?.length === 0) {
      throw new ForbiddenException({
        message: 'ids array should have at least one item.'
      });
    } else {
      return dto;
    }
  }

  /**
   * @throws BadRequestException
   * @throws ForbiddenException
   * @param dto
   * @param keys
   */
  checkUpsertVehicleDto(dto: UpdateVehicleDto | CreateVehicleDto, keys: string[]): CreateVehicleDto | UpdateVehicleDto {
    if (!dto.name) {
      throw new BadRequestException({
        message: 'name must be in request.'
      });
    } else if (checkObjectKeys(dto, keys)) {
      const k = filterObjectKeys(dto, keys);

      throw new ForbiddenException({
        message: `fields "${k.join(', ')}" are not allowed here.`
      });
    } else {
      return dto;
    }
  }
}
