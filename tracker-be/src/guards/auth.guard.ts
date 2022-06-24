import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {SESSION_TOKEN} from "../constants";
import {InjectModel} from "@nestjs/mongoose";
import {Session, SessionDocument} from "../schemas";
import {Model} from "mongoose";
import {TokenCreator} from "../helpers";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies[SESSION_TOKEN];
    const jwtBody = TokenCreator.getJwtBody(token);
    const session = await this.sessionModel.findOne({userId: jwtBody.id}).exec();

    if (!session?.signature || !TokenCreator.checkSignature(token, session.signature)) {
      throw new UnauthorizedException({message: 'User is not authorized.'});
    }

    return true;
  }
}
