import * as crypto from "crypto";

import {Bcrypt} from "./bcrypt";
import {IJwtBody} from "../models/user.model";


export abstract class TokenCreator {

  public static generateJWT(user: IJwtBody, key: string): string {
    const head = Buffer.from(JSON.stringify({alg: "HS256", typ: "jwt"})).toString("base64");
    const body = Buffer.from(JSON.stringify(user)).toString("base64");

    const signature = crypto
      .createHmac("SHA256", key)
      .update(`${head}.${body}`)
      .digest("base64");

    return `${head}.${body}.${signature}`;
  }

  public static async generateSignature(): Promise<string> {
    const signatureHash = await Bcrypt.hash(`${Math.random()}`);
    return this.generateToken(signatureHash);
  }

  private static generateToken(hash: string) {
    return crypto
      .createHmac("SHA256", hash)
      .update(`${Math.random()}`)
      .digest("base64");
  }

  public static checkSignature(token: string, signature: string): boolean {
    const tokenParts = token.split('.');

    const result = crypto
      .createHmac("SHA256", signature)
      .update(`${tokenParts[0]}.${tokenParts[1]}`)
      .digest("base64");

    return result === tokenParts[2];
  }

  public static getJwtBody(token: string | undefined): IJwtBody {
    const tokenParts = token ? token.split('.') : [];
    let result: IJwtBody;

    if (tokenParts[1] === undefined) {
      result = { id: '' };
    } else {
      try {
        result = JSON.parse(Buffer.from(tokenParts[1], "base64").toString("utf8")) as IJwtBody;
      } catch (_) {
        result = { id: '' };
      }
    }

    return result;
  }
}
