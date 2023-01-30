import { Router } from "express";
import { getTickets, getTicketsTypes, postCreateTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketsTypes)
  .post("/", validateBody(createTicketSchema), postCreateTicket);

export { ticketsRouter };
