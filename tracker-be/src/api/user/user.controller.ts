import {Controller, Delete, Get, Req, UseGuards} from "@nestjs/common";
import {Request} from "express";

import {AuthGuard} from "../../guards";
import {UserService} from "../../services";
import {SESSION_TOKEN} from "../../constants";


@Controller('users')
@UseGuards(AuthGuard)
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('current')
  async getCurrentUser(@Req() req: Request): Promise<any> {
    const token = req.cookies[SESSION_TOKEN];
    const user = await this.userService.getUser(token);

    return { id: user.id, login: user.login };
  }

  @Delete('current')
  async deleteCurrentUser(@Req() req: Request): Promise<void> {
    const token = req.cookies[SESSION_TOKEN];
    await this.userService.deleteUser(token);
  }

}
