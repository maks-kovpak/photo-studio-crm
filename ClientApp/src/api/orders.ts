import axios from 'axios';

import type { TableDefinition } from '@/types';
import type { OrderModel } from '@/types/models';

export const ordersApi = {
  getAll() {
    return axios.get<TableDefinition<OrderModel>>('/api/orders');
  },
};
