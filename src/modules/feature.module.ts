import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule],
  providers: [],
  exports: [AuthModule],
})
export class FeatureModule {}
