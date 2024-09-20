import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DetectCarModule } from 'src/detect-car/detect-car.module';
import { MessageModule } from 'src/messages/messages.module';
import { VNPayModule } from 'src/vnpay/vnpay.module';
@Module({
  imports: [AuthModule, VNPayModule, MessageModule, DetectCarModule],
  providers: [],
  exports: [AuthModule, VNPayModule, MessageModule, DetectCarModule],
})
export class FeatureModule {}
