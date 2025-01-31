import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  criar(@Body() criarProdutoDto: CriarProdutoDto) {
    return this.produtosService.criar(criarProdutoDto);
  }

  @Get()
  listarTodos() {
    return this.produtosService.listarTodos();
  }

  @Get('venda/:id')
  async findProdutosByVenda(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.findByVendaId(id);
  }
}
