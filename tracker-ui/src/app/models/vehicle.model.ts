export interface IVehicleBase {
  name: string;
  description: string;
}

export interface IVehicle extends IVehicleBase {
  id: string;
}

export class Vehicle implements IVehicle {
  readonly id: string;
  readonly name: string;
  readonly description: string;

  constructor(init: Vehicle) {
    this.id = init.id;
    this.name = init.name;
    this.description = init.description;
  }
}

export class UpsertVehicleDto implements IVehicleBase {
  readonly name: string;
  readonly description: string;

  constructor(init: UpsertVehicleDto) {
    this.name = init.name;
    this.description = init.description;
  }
}
