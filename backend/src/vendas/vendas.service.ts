import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service'; // Importe o PrismaService
import { CriarVendaDto } from './dto/criar-venda.dto';

@Injectable()
export class VendasService {
  constructor(private readonly prisma: PrismaService) {} // Injetando o PrismaService

  async create(criarVendaDto: CriarVendaDto) {
    return this.prisma.venda.create({
      data: {
        produtos: {
          connect: criarVendaDto.produtosIds.map((id) => ({ id })), // Conecta os produtos existentes
        },
      },
    });
  }

  async findAll() {
    return this.prisma.venda.findMany({
      include: {
        produtos: true,
      },
    });
  }
}
