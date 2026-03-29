import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExpenseTrackerModule } from './controllers/expense.tracker/expense.tracker.module';
import { UsersModule } from './controllers/users/users.module';
import { AccountsModule } from './controllers/Accounts/accounts.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		ExpenseTrackerModule,
		UsersModule,
		AccountsModule,
	],
})
export class AppModule {}

