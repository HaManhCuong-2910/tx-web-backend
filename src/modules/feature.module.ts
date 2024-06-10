import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/messages/messages.module';
@Module({
  imports: [AuthModule, MessageModule],
  providers: [],
  exports: [AuthModule, MessageModule],
})
export class FeatureModule {}
