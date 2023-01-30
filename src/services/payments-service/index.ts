import ticketRepository from "@/repositories/tickets-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";

async function PaymentsGET(ticketId: number, userId: number): Promise<Payment> {
  if (!ticketId) throw new Error("É preciso de um tickedId");

  const payments = await paymentRepository.findPayments(ticketId);
  if (!payments) throw notFoundError();

  const paymentUser = await paymentRepository.findPaymentsByUserId(ticketId, userId);
  if (!paymentUser) throw unauthorizedError();

  return payments;
}

async function createPayment(paymentProcess: PaymentSchema & { userId: number }): Promise<Payment> {
  const TicketUpdated = await ticketRepository.updateStatusTicket(paymentProcess.ticketId);
  
  const ticketUser = await ticketRepository.getTicketIdandUserId(paymentProcess.ticketId, paymentProcess.userId);

  const paymentPaid = await paymentRepository.createProcess({
    ...paymentProcess,
    value: TicketUpdated.TicketType.price,
  });

  if (!TicketUpdated) throw notFoundError();
  if (!ticketUser) throw unauthorizedError();
  if (!paymentPaid) throw notFoundError();

  return paymentPaid;
}

export type PaymentSchema = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

const paymentsService = {
  getPayments: PaymentsGET,
  createPayment,
};

export default paymentsService;
