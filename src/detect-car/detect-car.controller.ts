import { Body, Controller, Post } from '@nestjs/common';
import { DetectCarService } from './detect-car.service';
import * as tf from '@tensorflow/tfjs';

@Controller('detect-car')
export class DetectCarController {
  constructor(private readonly detectCarService: DetectCarService) {}

  @Post('/images')
  async handleDetect(@Body() body: { data: tf.Tensor[] }) {
    return await this.detectCarService.handleDetect(body);
  }
}
