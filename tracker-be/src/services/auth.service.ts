import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {Model} from "mongoose";
import * as crypto from "crypto";
import {InjectModel} from "@nestjs/mongoose";

import {RegisterUserDto} from "../api/auth/dto/register-user.dto";
import {IUserPasswordHashes, IUserWithJwt} from "../models";
import {TokenCreator} from "../helpers";
import {LoginUserDto} from "../api/auth/dto/login-user.dto";
import {SessionService} from "./session.service";
import {UpdateSessionDto} from "../api/auth/dto/update-session.dto";
import {User, UserDocument} from "../schemas";


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private sessionService: SessionService
  ) {
  }

  /**
   * @throws ForbiddenException
   */
  async register(registerUserDto: RegisterUserDto): Promise<IUserWithJwt> {
    const user = await this.userModel.findOne({login: registerUserDto.login}).exec();

    if (user && !user.deleteDate) {
      throw new ForbiddenException({
        message: `User with login "${registerUserDto.login}" is already exist.`
      });
    }

    const {salt, hash} = this.generatePasswordHashes(registerUserDto.password);

    if (user && user.deleteDate) {
      const user = await this.userModel.findOneAndUpdate({ login: registerUserDto.login }, { salt, hash, deleteDate: null });
      const jwt = await this.saveSession(user.id);

      return {
        id: user.id,
        login: user.login,
        jwt
      };
    }

    const createdUser = new this.userModel({salt, hash, login: registerUserDto.login});

    await createdUser.save();
    const jwt = await this.saveSession(createdUser.id);

    return {
      id: createdUser.id,
      login: createdUser.login,
      jwt
    };
  }

  /**
   * @throws NotFoundException
   * @param loginUserDto
   */
  async login(loginUserDto: LoginUserDto): Promise<IUserWithJwt> {
    const user = await this.userModel.findOne({login: loginUserDto.login}).exec();

    if (!user || user?.deleteDate) {
      throw new NotFoundException({ message: 'User not found.' });
    }

    const isPasswordValid = user ? this.isPasswordValid(loginUserDto.password, user) : false;
    let jwt = '';

    if (isPasswordValid) {
      jwt = await this.saveSession(user.id);
    }

    return {
      id: user?.id,
      login: user?.login,
      isPasswordValid,
      jwt,
    }
  }

  private async saveSession(id: string): Promise<string> {
    const signature = await TokenCreator.generateSignature();
    const jwt = TokenCreator.generateJWT({id}, signature);

    await this.sessionService.save(new UpdateSessionDto({ userId: id, signature }));

    return jwt;
  }

  private generatePasswordHashes(password: string): IUserPasswordHashes {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return { salt, hash };
  }

  private isPasswordValid(password: string, user: User): boolean {
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
    return user.hash === hash;
  }
}
