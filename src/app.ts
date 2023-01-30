import express, { Express } from "express";
import cors from "cors";
import { handleApplicationErrors } from "@/middlewares";
import { loadEnv, connectDb, disconnectDB } from "@/config";
import {
  usersRouter,
  authenticationRouter,
  eventsRouter,
  enrollmentsRouter,
  ticketsRouter,
  paymentRouter,
} from "@/routers";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/event", eventsRouter)
  .use("/tickets", ticketsRouter)
  .use("/enrollments", enrollmentsRouter)
  .use("/payments", paymentRouter)
  .use(handleApplicationErrors);

export async function close(): Promise<void> {
  await disconnectDB();
}
export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export default app;
