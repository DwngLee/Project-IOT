export enum Action {
  "Bật đèn" = 1,
  "Tắt đèn" = 2,
  "Bật quạt" = 3,
  "Tắt quạt" = 4,
}

export interface ActionHistory {
  id: string;
  deviceName: string;
  action: string;
  time: Date;
}
