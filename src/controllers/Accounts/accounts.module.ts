import { Module } from "@nestjs/common";
import { AccountController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { PgSqlSharedClientModule } from "src/shared/pgsql.shared.client.module";

@Module({
    controllers: [AccountController],
    imports: [PgSqlSharedClientModule],
    providers: [AccountsService],
    exports: [AccountsService],
})
export class AccountsModule {}