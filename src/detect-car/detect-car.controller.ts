import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DetectCarService } from './detect-car.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/common/storage.config';

@Controller('detect-car')
export class DetectCarController {
  constructor(private readonly detectCarService: DetectCarService) {}

  @Post('handle-image')
  @UseInterceptors(AnyFilesInterceptor(storageConfig))
  async handleImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.detectCarService.handleImage(files);
  }
}
