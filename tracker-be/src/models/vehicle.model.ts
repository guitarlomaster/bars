import {VehicleDocument} from "../schemas";

export class VehicleResponse {
  id: string;
  name: string;
  description?: string;

  constructor(init: VehicleResponse | VehicleDocument) {
    this.id = init.id;
    this.name = init.name;
    this.description = init.description ?? '';
  }
}
