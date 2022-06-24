import {Body, Controller, HttpCode, HttpStatus, Post, Res, UsePipes} from "@nestjs/common";
import {Response} from "express";

import {AuthService} from "../../../services";
import {UserResponse} from "../../../models";
import {RegisterUserDto} from "../dto/register-user.dto";
import {AuthRequestValidationPipe} from "../pipes/auth-request-validation.pipe";
import {SESSION_TOKEN} from "../../../constants";


@Controller('register')
export class RegisterController {
  constructor(private authService: AuthService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new AuthRequestValidationPipe())
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response
  ): Promise<void> {
    const {id, login, jwt} = await this.authService.register(registerUserDto);

    res
      .cookie(SESSION_TOKEN, jwt)
      .status(HttpStatus.CREATED)
      .json(new UserResponse({ id, login }));
  }
}
