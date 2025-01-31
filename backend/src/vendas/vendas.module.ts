import { Module } from '@nestjs/common';
import { VendasController } from './vendas.controller';
import { PrismaService } from '../database/prisma.service';
import { VendasService } from './vendas.service';

@Module({
  controllers: [VendasController],
  providers: [VendasService, PrismaService],
})
export class VendasModule {}
