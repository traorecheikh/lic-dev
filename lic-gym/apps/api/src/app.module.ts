import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './common/prisma/prisma.module';
import { AccessModule } from './modules/access/access.module';
import { AuditModule } from './modules/audit/audit.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ClassesModule } from './modules/classes/classes.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { MembersModule } from './modules/members/members.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PlansModule } from './modules/plans/plans.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    MembersModule,
    PlansModule,
    SubscriptionsModule,
    PaymentsModule,
    InvoicesModule,
    AccessModule,
    ClassesModule,
    BookingsModule,
    NotificationsModule,
    ReportingModule,
    SettingsModule,
    AuditModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
