import { Request, Response } from "express";
import { HttpStatus, success } from "../utils";
import { Devices } from "./device.utils";
import { DeviceService } from "./device.service";

export const getDevices = async (req: Request, res: Response) => {
  try {
    const devices = await DeviceService.getDevices();
    res.status(HttpStatus.OK).json(success({ devices }));
  } catch (error) {
    console.error("Error getting devices:", error);
    res.status(HttpStatus.Error).json({ message: "Failed to get devices" });
  }
};

export const saveDevice = async (
  req: Request<{}, {}, Devices.DeviceRecord>,
  res: Response
) => {
  if (!req.body.name || !req.body.serialNumber) {
    res.status(HttpStatus.BadRequest).json({ message: "Invalid input data" });
    return;
  }
  try {
    const response = await DeviceService.createDeviceService(
      req.body.name,
      req.body.serialNumber
    );
    const { name, serialNumber } = response;
    const newDevice: Devices.DeviceRecord = {
      name,
      serialNumber,
      creationDate: response.createdAt.toISOString(),
    };
    res.status(HttpStatus.Created).json(success({ device: newDevice }));
  } catch (error: any) {
    console.error("Error creating device:", error);
    if ("code" in error && error.code === 11000) {
      res
        .status(HttpStatus.BadRequest)
        .json({ error, message: "Serial number must be unique" });
    } else {
      res
        .status(HttpStatus.Error)
        .json({ error, message: "Failed to create device" });
    }
  }
};
