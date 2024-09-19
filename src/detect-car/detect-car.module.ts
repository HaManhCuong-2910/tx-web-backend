import { Module } from '@nestjs/common';
import { CoreModule } from 'src/modules/core.module';
import { DetectCarController } from './detect-car.controller';
import { DetectCarService } from './detect-car.service';

@Module({
  imports: [CoreModule],
  controllers: [DetectCarController],
  providers: [DetectCarService],
  exports: [DetectCarService],
})
export class DetectCarModule {}
