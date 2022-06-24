import {Body, Controller, Post, Res, UsePipes} from "@nestjs/common";
import {Response} from "express";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

import {LoginUserDto} from "../dto/login-user.dto";
import {SESSION_TOKEN} from "../../../constants";
import {AuthService} from "../../../services";
import {AuthRequestValidationPipe} from "../pipes/auth-request-validation.pipe";
import {UserResponse} from "../../../models";


@Controller('login')
export class LoginController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Post()
  @UsePipes(new AuthRequestValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<void> {
    const {id, login, isPasswordValid, jwt} = await this.authService.login(loginUserDto);

    if (!isPasswordValid) {
      res
        .cookie(SESSION_TOKEN, '')
        .status(401)
        .send();
      return;
    }

    res
      .cookie(SESSION_TOKEN, jwt)
      .status(200)
      .json(new UserResponse({ id, login }))
  }

}
