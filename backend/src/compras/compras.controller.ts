import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CriarCompraDto } from './dto/criar-compra.dto';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  criar(@Body() criarCompraDto: CriarCompraDto) {
    return this.comprasService.create(criarCompraDto);
  }

  @Get()
  listarTodas() {
    return this.comprasService.findAll();
  }

  @Get(':id')
  async listarPorId(@Param('id', ParseIntPipe) id: number) {
    const compra = await this.comprasService.findById(id);
    if (!compra) {
      throw new NotFoundException(`Compra com id ${id} não encontrada.`);
    }
    return compra;
  }

  @Delete(':id')
  async deletar(@Param('id') id: number) {
    const compra = await this.comprasService.delete(id);
    if (!compra) {
      throw new NotFoundException(`Compra com id ${id} não encontrada.`);
    }
    return { message: 'Compra deletada com sucesso.' };
  }
}
