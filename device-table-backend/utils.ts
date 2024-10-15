import { model, Schema } from "mongoose";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
      PORT: string;
      DB_CONNECTION_STRING: string;
      NODE_ENV: "dev" | "production" | "test";
    }
  }
}

export const success = <T extends object>(data: T) => ({
  message: "OK",
  ...data,
});

export enum HttpStatus {
  "Error" = 500,
  "OK" = 200,
  "Created" = 201,
  "BadRequest" = 400,
}
