export class UpdateSessionDto {
  readonly userId: string;
  readonly signature: string;

  constructor(data: UpdateSessionDto) {
    this.userId = data.userId;
    this.signature = data.signature;
  }
}
