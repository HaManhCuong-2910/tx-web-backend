import { Schema } from 'mongoose';
import { IProductInOrder } from './order-product';

const ordersSchema = new Schema(
  {
    product: [
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
        giaLe: {
          type: Number,
          require: true,
          default: 0,
        },
        countNumber: {
          type: Number,
          require: true,
          default: 0,
        },
        Unit: {
          type: String,
          require: true,
          default: 'USD',
        },
        image: {
          type: String,
          require: true,
          default: '',
        },
      },
    ],
    nhaCungCap: {
      type: String,
      require: true,
      default: '',
    },
    ngayNhap: {
      type: Date,
      require: true,
    },
    GhiChu: {
      type: String,
      require: true,
      default: '',
    },
    HinhThucThanhToan: {
      type: String,
      require: true,
      default: '',
    },
    Vat: {
      type: Number,
      require: true,
      default: 0,
    },
    chietKhau: {
      type: Number,
      require: true,
      default: 0,
    },
    KhachTra: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
    versionKey: false,
  },
);

export { ordersSchema };

export interface Order extends Document {
  product: IProductInOrder[];
  nhaCungCap: string;
  ngayNhap: Date;
  GhiChu: string;
  HinhThucThanhToan: string;
  Vat: number;
  chietKhau: number;
  KhachTra: number;
}
