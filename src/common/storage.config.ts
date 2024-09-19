import { diskStorage, MulterError } from 'multer';
import { join } from 'path';
import { MAX_FILE_SIZE } from './common';

export const storageConfig = {
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE },
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'public/images'),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};
