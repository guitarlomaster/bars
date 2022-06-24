export interface IUser {
  id: string;
  login: string;
}

export class UserCredentialsDto {
  readonly login: string;
  readonly password: string;

  constructor(init: UserCredentialsDto) {
    this.login = init.login;
    this.password = init.password;
  }
}
