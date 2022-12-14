import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Order, OrderItem])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
