import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async criar(criarProdutoDto: CriarProdutoDto) {
    return this.prisma.produto.create({
      data: criarProdutoDto,
    });
  }

  async listarTodos() {
    return this.prisma.produto.findMany();
  }

  // produtos.service.ts
  async findByVendaId(vendaId: number) {
    try {
      console.log('Buscando produtos para a venda:', vendaId);
      const produtos = await this.prisma.produto.findMany({
        where: {
          vendas: {
            some: {
              id: vendaId, // sem aspas aqui
            },
          },
        },
      });
      console.log('Produtos encontrados:', produtos);
      return produtos;
    } catch (error) {
      console.error('Erro ao buscar produtos por venda:', error);
      throw error;
    }
  }
}
