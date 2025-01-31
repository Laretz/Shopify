import { Controller, Get, Post, Body } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CriarVendaDto } from './dto/criar-venda.dto';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  criar(@Body() criarVendaDto: CriarVendaDto) {
    return this.vendasService.create(criarVendaDto);
  }

  @Get()
  listarTodas() {
    return this.vendasService.findAll();
  }
}
