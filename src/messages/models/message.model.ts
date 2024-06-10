import { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      default: '',
    },
    title: {
      type: String,
      require: true,
      default: '',
    },
    message: {
      type: String,
      require: true,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'messages',
    versionKey: false,
  },
);

export { messageSchema };

export interface Messages extends Document {
  username: string;
  title: string;
  message: string;
}
