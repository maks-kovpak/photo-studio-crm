import axios from '@/api/axios';
import { paths } from '@/lib/paths';

import type { TableDefinition, ResponseResult } from '@/types';
import type { ClientModel } from '@/types/models';
import type { PatchBody } from '@/types/utils';

export const clientsApi = {
  getAll() {
    return axios.get<TableDefinition<ClientModel>>(paths.clients);
  },

  updateClient(id: number, body: PatchBody<ClientModel>) {
    return axios.patch<ResponseResult>(`${paths.clients}/${id}`, body);
  },
};
