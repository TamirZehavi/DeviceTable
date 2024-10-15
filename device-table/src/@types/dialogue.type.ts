import { TableRecord } from "./table.type";

export type DialogueData = {
  onClose: (record: TableRecord) => void;
};

export type SaveDeviceResponse = { device: TableRecord };
