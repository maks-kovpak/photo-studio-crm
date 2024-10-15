import axios from '@/api/axios';
import { paths } from '@/lib/paths';

import type { TableDefinition, ResponseResult } from '@/types';
import type { ClientModel } from '@/types/models';
import type { PatchBody } from '@/types/utils';

export const clientsApi = {
  async getAll() {
    const response = await axios.get<TableDefinition<ClientModel>>(paths.clients);
    return response.data;
  },

  async updateClient(id: number, body: PatchBody<ClientModel>) {
    const response = await axios.patch<ResponseResult>(`${paths.clients}/${id}`, body);
    return response.data;
  },
};
