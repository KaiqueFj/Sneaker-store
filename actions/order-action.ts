'use server';

import { requireUser } from '@/lib/requireUser';
import { createOrderService, getOrdersService } from '@/services/orders-service';
import { CreateOrderInput } from '@/types/order';

export async function createOrderAction(input: CreateOrderInput) {
  const userId = await requireUser();
  return await createOrderService(userId, input);
}

export async function getOrdersAction() {
  const userId = await requireUser();
  return await getOrdersService(userId);
}
