export type TableRecordResponse = {
  devices: TableRecord[];
};

export type TableRecord = {
  name: string;
  serialNumber: number;
  creationDate: string;
};

export type TableRecordColumns = keyof TableRecord;

export const columns: TableRecordColumns[] = [
  "name",
  "serialNumber",
  "creationDate",
];
