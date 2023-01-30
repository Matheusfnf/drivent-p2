import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;

  try {
    const pagamentos = await paymentsService.getPayments(+ticketId, userId);

    return res.status(httpStatus.OK).send(pagamentos);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function postPaymentCreate(req: AuthenticatedRequest, res: Response) {
  try {
    const paymentPaid = await paymentsService.createPayment({
      ...req.body,
      userId: req.userId,
    });

    return res.status(httpStatus.OK).send(paymentPaid);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    if (error.name === "NotFoundError" || error.name === "Error") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
