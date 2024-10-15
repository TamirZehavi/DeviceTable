import { Devices } from "./device.utils";

export namespace DeviceService {
  export const getDevices = async (): Promise<Devices.DeviceRecord[]> => {
    const response = await Devices.DeviceModel.find();
    return response.map((d) => ({
      name: d.name,
      serialNumber: d.serialNumber,
      creationDate: d.createdAt.toISOString(),
    }));
  };

  export const createDeviceService = async (
    name: string,
    serialNumber: number
  ) => {
    const device = new Devices.DeviceModel({ name, serialNumber });
    return device.save();
  };
}
