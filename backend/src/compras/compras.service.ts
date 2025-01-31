import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CriarCompraDto } from './dto/criar-compra.dto';

@Injectable()
export class ComprasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CriarCompraDto) {
    return this.prisma.compra.create({ data });
  }

  async findAll() {
    return this.prisma.compra.findMany({
      include: {
        venda: true,
        produto: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.compra.findUnique({
      where: { id },
      include: {
        venda: true,
        produto: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.compra.delete({
      where: { id },
    });
  }
}
