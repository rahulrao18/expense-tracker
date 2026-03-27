import { Module } from '@nestjs/common';
import { ExpenseTrackerController } from './expense.tracker.controller';
import { ExpenseTrackerService } from './expense.tracker.service';
import { PgSqlSharedClientModule } from 'src/shared/pgsql.shared.client.module';

@Module({
    imports: [ PgSqlSharedClientModule ],
    controllers: [ExpenseTrackerController],
    providers: [ExpenseTrackerService],
    exports: [ExpenseTrackerService],
})
export class ExpenseTrackerModule {}