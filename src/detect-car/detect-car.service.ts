import { Injectable } from '@nestjs/common';

@Injectable()
export class DetectCarService {
  constructor() {}

  async handleImage(files: Array<Express.Multer.File>) {
    console.log('files', files);
    return 'test';
  }
}
