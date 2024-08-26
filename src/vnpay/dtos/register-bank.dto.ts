export class InfoRegisterBankModel {
  checkList: EReason[];
  name: string;
  phoneNumber: string;
  address: string;
  peopleID: string;
  accountNumber: string;
  branch: string;
  otherReason: string;
}

export enum EReason {
  LOST_CCCD = 'LOST_CCCD',
  NO_CCCD = 'NO_CCCD',
  IN_OTHER_COUNTRY = 'IN_OTHER_COUNTRY',
  EXPIRED_CCCD = 'EXPIRED_CCCD',
  FAIL_APP = 'FAIL_APP',
  NO_NFC = 'NO_NFC',
  OTHER_REASON = 'OTHER_REASON',
}

export const dataReason = {
  [EReason.LOST_CCCD]: 'Đã mất căn cước công dân',
  [EReason.NO_CCCD]: 'Chưa làm căn cước công dân',
  [EReason.IN_OTHER_COUNTRY]: 'Đang ở nước ngoài',
  [EReason.EXPIRED_CCCD]: 'Căn cước công dân hết hạn',
  [EReason.FAIL_APP]: 'Lỗi app',
  [EReason.NO_NFC]: 'Thiết bị không có NFC',
  [EReason.OTHER_REASON]: 'Lý do khác',
};
