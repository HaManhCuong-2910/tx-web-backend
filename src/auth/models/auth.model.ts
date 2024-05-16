import { Schema } from 'mongoose';

const authSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      default: '',
    },
    password: {
      type: String,
      require: true,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'auth',
    versionKey: false,
  },
);

export { authSchema };

export interface Auth extends Document {
  username: string;
  password: string;
}
