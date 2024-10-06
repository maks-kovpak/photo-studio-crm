import axios from 'axios';

import type { TableDefinition, ResponseResult } from '@/types';
import type { ClientModel } from '@/types/models';
import type { PatchBody } from '@/types/utils';

const CLIENTS_BASE_URL = '/api/clients/';

export const clientsApi = {
  getAll() {
    return axios.get<TableDefinition<ClientModel>>(CLIENTS_BASE_URL);
  },

  updateClient(id: number, body: PatchBody<ClientModel>) {
    return axios.patch<ResponseResult>(`${CLIENTS_BASE_URL}${id}`, body);
  },
};
