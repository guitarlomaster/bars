export const createVehicleDtoKeys = ['name', 'description'];

export class CreateVehicleDto {
  readonly name: string;
  readonly description?: string;
}
