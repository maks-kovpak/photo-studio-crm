import axios from '@/api/axios';
import { paths } from '@/lib/paths';

import type { TableDefinition, ResponseResult } from '@/types';
import type { OrderModel } from '@/types/models';
import type { PatchBody } from '@/types/utils';

export const ordersApi = {
  async getAll() {
    const response = await axios.get<TableDefinition<OrderModel>>(paths.orders);
    return response.data;
  },

  async updateOrder(id: number, body: PatchBody<OrderModel>) {
    const response = await axios.patch<ResponseResult>(`${paths.orders}/${id}`, body);
    return response.data;
  },
};
