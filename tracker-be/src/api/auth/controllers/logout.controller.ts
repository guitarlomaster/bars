import {Controller, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";

import {SESSION_TOKEN} from "../../../constants";
import {SessionService} from "../../../services";


@Controller('logout')
export class LogoutController {
  constructor(private sessionService: SessionService) {
  }

  @Post()
  async logout(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies[SESSION_TOKEN];
    const isLogoutSuccess = await this.sessionService.delete(sessionToken);

    res
      .cookie(SESSION_TOKEN, '')
      .status(isLogoutSuccess ? 200 : 401)
      .send();
  }
}
