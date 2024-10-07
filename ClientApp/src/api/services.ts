import axios from '@/api/axios';

import type { TableDefinition } from '@/types';
import type { ServiceModel } from '@/types/models';

export const servicesApi = {
  getAll() {
    return axios.get<TableDefinition<ServiceModel>>('/services');
  },
};
