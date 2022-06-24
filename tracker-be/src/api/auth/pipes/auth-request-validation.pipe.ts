import {ArgumentMetadata, BadRequestException, ForbiddenException, Injectable, PipeTransform} from "@nestjs/common";

import {RegisterUserDto, registerUserDtoKeys} from "../dto/register-user.dto";
import {LoginUserDto, loginUserDtoKeys} from "../dto/login-user.dto";
import {checkObjectKeys, filterObjectKeys} from "../../../helpers";


@Injectable()
export class AuthRequestValidationPipe implements PipeTransform {

  /**
   * @throws BadRequestException
   * @throws ForbiddenException
   * @param value
   * @param metadata
   */
  transform(value: any, metadata: ArgumentMetadata): any {
    switch (metadata.metatype.name) {
      case RegisterUserDto.name:
        return this.checkRegisterUserDto(value);
      case LoginUserDto.name:
        return this.checkLoginUserDto(value);
      default:
        return value;
    }
  }

  /**
   * @throws BadRequestException
   * @throws ForbiddenException
   * @param dto
   * @private
   */
  private checkLoginUserDto(dto: LoginUserDto) {
    if (!dto.login) {
      throw new BadRequestException({
        message: 'login must be in request.'
      });
    } else if (!dto.password) {
      throw new BadRequestException({
        message: 'password must be in request.'
      });
    } else if (checkObjectKeys(dto, loginUserDtoKeys)) {
      const keys = filterObjectKeys(dto, loginUserDtoKeys);

      throw new ForbiddenException({
        message: `fields "${keys.join(', ')}" are not allowed here.`
      });
    } else {
      return dto;
    }
  }

  /**
   * @throws BadRequestException
   * @throws ForbiddenException
   * @param dto
   * @private
   */
  private checkRegisterUserDto(dto: RegisterUserDto): RegisterUserDto {
    if (!dto.login) {
      throw new BadRequestException({
        message: 'login must be in request.'
      });
    } else if (!dto.password) {
      throw new BadRequestException({
        message: 'password must be in request.'
      });
    } else if (checkObjectKeys(dto, registerUserDtoKeys)) {
      const keys = filterObjectKeys(dto, registerUserDtoKeys);

      throw new ForbiddenException({
        message: `fields "${keys.join(', ')}" are not allowed here.`
      });
    } else {
      return dto;
    }
  }

}
