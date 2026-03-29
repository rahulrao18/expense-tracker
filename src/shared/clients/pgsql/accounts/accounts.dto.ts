import { PartialType } from "@nestjs/swagger";

export class CreateAccountDto {
    user_id: string;
    account_name: string;
    balance: number;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}