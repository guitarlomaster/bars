import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Session, SessionDocument} from "../schemas";
import {UpdateSessionDto} from "../api/auth/dto/update-session.dto";
import {IJwtBody} from "../models";
import {TokenCreator} from "../helpers";


@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {
  }

  async getSessionValid(token: string): Promise<boolean> {
    if (!token) {
      return false;
    }

    const jwtBody = TokenCreator.getJwtBody(token);
    const session = await this.sessionModel.findOne({userId: jwtBody.id}).exec();

    if (!session) {
      return false;
    }

    return TokenCreator.checkSignature(token, session.signature);
  }

  async save(updateSessionDto: UpdateSessionDto): Promise<void> {
    const session = await this.sessionModel.findOne({ userId: updateSessionDto.userId }).exec();
    if (session) {
      await this.sessionModel.updateOne({ userId: updateSessionDto.userId }, updateSessionDto).exec();
    } else {
      const createdSession = new this.sessionModel(updateSessionDto);
      await createdSession.save();
    }
  }

  async delete(sessionToken: string): Promise<boolean> {
    const jwtBody: IJwtBody = TokenCreator.getJwtBody(sessionToken);
    const session: Session = await this.sessionModel.findOne({userId: jwtBody.id}).exec();

    if (!session) {
      return false;
    }

    const isSessionValid = TokenCreator.checkSignature(sessionToken, session.signature);

    if (!isSessionValid) {
      return false;
    }

    await this.sessionModel.findOneAndDelete({ userId: jwtBody.id, signature: session.signature }).exec();

    return true;
  }
}
