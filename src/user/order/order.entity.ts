/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Seat } from 'src/user/seat/seat.entity';

@Entity('order')
@UseInterceptors(ClassSerializerInterceptor)
export class Order {
  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
  @PrimaryColumn({
    name: 'orderId',
  })
  orderId: number;

  @Column({
    name: 'userId',
  })
  userId: number;

  @Column({
    name: 'cinemaId',
  })
  cinemaId: number;

  @Column({
    name: 'cinemaName',
  })
  cinemaName: string;

  @Column({
    name: 'showAt',
  })
  showAt: string;

  @Column({
    name: 'endAt',
  })
  endAt: string;

  @Column({
    name: 'hallId',
  })
  hallId: number;

  @Column({
    name: 'hallName',
  })
  hallName: string;

  @Column({
    name: 'filmId',
  })
  filmId: number;

  @Column({
    name: 'filmName',
  })
  filmName: string;

  @Column({
    name: 'scheduleId',
  })
  scheduleId: number;

  seatList: Seat[];
}