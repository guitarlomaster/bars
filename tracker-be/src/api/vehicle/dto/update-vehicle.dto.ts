export const updateVehicleDtoKeys = ['name', 'description'];

export class UpdateVehicleDto {
  readonly name: string;
  readonly description?: string;
}
