import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExpenseTrackerModule } from './controllers/expense.tracker/expense.tracker.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		ExpenseTrackerModule,
	],
})
export class AppModule {}

