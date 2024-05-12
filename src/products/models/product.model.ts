import { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    maDonHang: {
      type: String,
      require: true,
      default: '',
      index: true,
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
    Unit: {
      type: String,
      require: true,
      default: 'USD',
    },
    isSuaGiaKhiBan: {
      type: Boolean,
      require: true,
      default: false,
    },
    isChoBanAm: {
      type: Boolean,
      require: true,
      default: false,
    },
    giaVon: {
      type: Number,
      require: true,
      default: 0,
    },
    thongTinThem: {
      type: String,
      require: true,
      default: '',
    },
    linkNhap: {
      type: String,
      require: true,
      default: '',
    },
    giaLe: {
      type: Number,
      require: true,
      default: 0,
    },
    giaSi: {
      type: Number,
      require: true,
      default: 0,
    },
    baoHanh: {
      type: Number,
      require: true,
      default: 0,
    },
    danhMuc: {
      type: String,
      require: true,
      default: '',
    },
    nhaSanXuat: {
      type: String,
      require: true,
      default: '',
    },
    dinhMucToiThieu: {
      type: Number,
      require: true,
      default: 0,
    },
    dinhMucToiDa: {
      type: Number,
      require: true,
      default: 0,
    },
    image: {
      type: String,
      require: true,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'products',
    versionKey: false,
  },
);

export { productSchema };

export interface Product extends Document {
  maDonHang: string;
  name: string;
  countNumber: number;
  Unit: string;
  isSuaGiaKhiBan: boolean;
  isChoBanAm: boolean;
  giaVon: number;
  thongTinThem: string;
  linkNhap: string;
  giaLe: number;
  giaSi: number;
  baoHanh: number;
  danhMuc: string;
  nhaSanXuat: string;
  dinhMucToiThieu: number;
  dinhMucToiDa: number;
  image: string;
}
