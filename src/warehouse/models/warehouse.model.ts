import { Schema } from 'mongoose';
import { IProductInWareHouse } from './warehouse-product';

const warehouseSchema = new Schema(
  {
    products: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Inventory',
        },
        count: {
          type: Number,
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
    collection: 'warehouse',
    versionKey: false,
  },
);

export { warehouseSchema };

export interface Warehouse extends Document {
  products: IProductInWareHouse[];
  nhaCungCap: string;
  ngayNhap: Date;
  GhiChu: string;
  HinhThucThanhToan: string;
  Vat: number;
  chietKhau: number;
  KhachTra: number;
}
