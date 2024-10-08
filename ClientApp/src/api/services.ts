import axios from '@/api/axios';
import { paths } from '@/lib/paths';

import type { TableDefinition, ResponseResult } from '@/types';
import type { ServiceModel } from '@/types/models';
import type { PatchBody } from '@/types/utils';

export const servicesApi = {
  getAll() {
    return axios.get<TableDefinition<ServiceModel>>(paths.services);
  },

  updateService(id: number, body: PatchBody<ServiceModel>) {
    return axios.patch<ResponseResult>(`${paths.services}/${id}`, body);
  },
};
