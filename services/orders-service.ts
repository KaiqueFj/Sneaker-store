import { createOrderWithTransaction, getOrders } from '@/repository/order-repository';
import { CreateOrderInput, Order } from '@/types/order';

export function createOrderService(userId: string, input: CreateOrderInput) {
  return createOrderWithTransaction(userId, input);
}

export function getOrdersService(clientId: string): Promise<Order[]> {
  return getOrders(clientId);
}
