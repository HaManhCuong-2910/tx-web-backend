import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DetectCarService } from './detect-car.service';
import { DetectCarController } from './detect-car.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DetectCarController],
  providers: [DetectCarService],
})
export class DetectCarModule {}
