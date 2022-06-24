export interface IUserPasswordHashes {
  salt: string;
  hash: string;
}

export interface IUserWithJwt {
  id: string
  login: string;
  jwt: string;
  isPasswordValid?: boolean;
}

export interface IJwtBody {
  id: string;
}

export class UserResponse {
  id: string;
  login: string;

  constructor(init: UserResponse) {
    Object.assign(this, init);
  }
}
