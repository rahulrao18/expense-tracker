import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateAccountDto {

    @IsUUID()
    @IsString()
    user_id: string;

    @IsString()
    account_name: string;

    @IsNumber()
    balance: number;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}