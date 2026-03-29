import {
    Controller,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Get,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from './accounts.dto';

@Controller(AccountController.PREFIX)
export class AccountController {
    private static readonly PREFIX = 'accounts';
    constructor(private readonly service: AccountsService) {}

    @Post()
    async create(@Body() dto: CreateAccountDto) {
        return this.service.create(dto);
    }

    @Put(':id')
    async edit(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
       return this.service.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Get()
    async list() {
       return this.service.findAll();
    }
}

