import { Router } from "express";
import { createPaymentSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayments, postPaymentCreate } from "@/controllers";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", validateBody(createPaymentSchema), postPaymentCreate);

export { paymentRouter };
