import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/messages/messages.module';
import { VNPayModule } from 'src/vnpay/vnpay.module';
@Module({
  imports: [AuthModule, VNPayModule, MessageModule],
  providers: [],
  exports: [AuthModule, VNPayModule, MessageModule],
})
export class FeatureModule {}
