import { PrismaClient } from '@prisma/client'

export class PrismaService {
  protected prismaClient = new PrismaClient()
}
