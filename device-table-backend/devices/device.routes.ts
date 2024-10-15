import { Router } from "express";
import { Devices } from "./device.utils";
import { getDevices, saveDevice } from "./device.controller";

const router = Router();

router.get(`/${Devices.endpoints.getDevices}`, getDevices);

router.post(`/${Devices.endpoints.saveDevice}`, saveDevice);

export default router;
