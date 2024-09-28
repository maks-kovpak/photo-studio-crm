import axios from 'axios';

import type { TableDefinition } from '@/types';
import type { ClientModel } from '@/types/models';

export const clientsApi = {
  getAll() {
    return axios.get<TableDefinition<ClientModel>>('/api/clients');
  },
};
