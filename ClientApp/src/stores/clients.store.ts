import { create } from 'zustand';
import { clientsApi } from '@/api/clients';

import type { ClientModel } from '@/types/models';

interface IClientsState {
  clients: ClientModel[];
}

interface IClientsActions {
  setClients: (clients: ClientModel[]) => void;
  fetchClients: () => Promise<void>;
}

export const useClients = create<IClientsState & IClientsActions>((set) => ({
  clients: [],
  setClients: (clients: ClientModel[]) => set({ clients }),
  fetchClients: async () => {
    const { data: result } = await clientsApi.getAll();
    set({ clients: result.data });
  },
}));
