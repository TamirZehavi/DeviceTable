"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3005;
let memoryDatabase = [];
const fakeDevice = {
    name: "My name",
    serialNumber: 1010,
    creationcreationDate: new Date(),
};
memoryDatabase.push(fakeDevice);
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/api/getDevices", (req, res) => {
    console.log("Getting devices");
    // Here you can save the data to a database or perform any other actions
    res.status(200).json({ message: "OK", devices: [...memoryDatabase] });
});
app.post("/api/saveDevice", (req, res) => { });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map