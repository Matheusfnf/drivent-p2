import { prisma } from "@/config";

async function getTicketUserID(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function create(ticketTypeId: number, userId: number) {
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      TicketType: {
        connect: {
          id: ticketTypeId,
        },
      },
      Enrollment: {
        connect: {
          userId,
        },
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function checkEnrollment(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
}

async function updateStatusTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findAllTicketWithType() {
  return prisma.ticketType.findMany();
}

async function getTicketIdandUserId(id: number, userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
      id,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  findAllTicketWithType,
  updateStatusTicket,
  getTicketUserID,
  create,
  checkEnrollment,
  getTicketIdandUserId,
};

enum TicketStatus {
  RESERVED = "RESERVED",
  PAID = "PAID",
}

export default ticketRepository;
