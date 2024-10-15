import axios from '@/api/axios';
import { paths } from '@/lib/paths';

import type { TableDefinition, ResponseResult } from '@/types';
import type { ServiceModel } from '@/types/models';
import type { PatchBody } from '@/types/utils';

export const servicesApi = {
  async getAll() {
    const response = await axios.get<TableDefinition<ServiceModel>>(paths.services);
    return response.data;
  },

  async updateService(id: number, body: PatchBody<ServiceModel>) {
    const response = await axios.patch<ResponseResult>(`${paths.services}/${id}`, body);
    return response.data;
  },
};
