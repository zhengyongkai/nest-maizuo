import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Seat } from 'src/user/seat/seat.entity';
import { SeatService } from '../seat/seat.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderResitory: Repository<Order>,
    private seatResitory: SeatService,
  ) {}

  async getOrderByUserId(userId: number): Promise<Order> {
    const orders = await this.orderResitory.findOne({
      where: { userId },
    });
    return orders;
  }

  async addOrder(params): Promise<any> {
    const { raw } = await this.orderResitory.insert(params);
    const data = await this.seatResitory.addSeat(params.seat);
    console.log('data', data);
    return {
      id: raw.insertId,
      data: data,
    };
  }
}