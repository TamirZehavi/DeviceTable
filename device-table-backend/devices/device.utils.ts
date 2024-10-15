import { model, Schema } from "mongoose";

export namespace Devices {
  export type DeviceRecord = {
    name: string;
    serialNumber: number;
    creationDate?: string;
  };

  export const deviceSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      serialNumber: {
        type: Number,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

  export const DeviceModel = model("Device", deviceSchema);

  export const endpoints = {
    saveDevice: "saveDevice",
    getDevices: "getDevices",
  };
}
