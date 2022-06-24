import {Controller, Get, HttpStatus, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";

import {SESSION_TOKEN} from "../../../constants";
import {SessionService, UserService} from "../../../services";


@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService, private userService: UserService) {
  }

  @Get()
  async getSession(@Req() req: Request, @Res() res: Response) {
    const isSessionValid = await this.sessionService.getSessionValid(req.cookies[SESSION_TOKEN]);

    if (!isSessionValid) {
      res
        .cookie(SESSION_TOKEN, '')
        .status(HttpStatus.UNAUTHORIZED)
        .send();

      return;
    }

    const user = await this.userService.getUser(req.cookies[SESSION_TOKEN]);

    res
      .status(HttpStatus.OK)
      .json({
        id: user.id,
        login: user.login
      });
  }
}
