import { Schema } from 'mongoose';

const evaluateSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      default: '',
    },
    stars: {
      type: Number,
      require: true,
      default: 1,
    },
    image: {
      type: String,
      require: true,
      default: '',
    },
    content: {
      type: String,
      require: true,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'evaluates',
    versionKey: false,
  },
);

export { evaluateSchema };

export interface Evaluate extends Document {
  name: string;
  image: string;
  content: string;
}
