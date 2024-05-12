import { Schema } from 'mongoose';

const inventorySchema = new Schema(
  {
    maDonHang: {
      type: String,
      require: true,
      default: '',
    },
    name: {
      type: String,
      require: true,
      default: '',
    },
    countNumber: {
      type: Number,
      require: true,
      default: 0,
    },
    giaLe: {
      type: Number,
      require: true,
      default: 0,
    },
    giaVon: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'inventory',
    versionKey: false,
  },
);

export { inventorySchema };

export interface Inventory extends Document {
  maDonHang: string;
  name: string;
  countNumber: number;
  giaLe: number;
  giaVon: number;
}
