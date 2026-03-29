import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserType } from "src/shared/clients/pgsql/users/users.entity";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsEnum(UserType)
    type: UserType;

    @IsString()
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}