import { create } from 'zustand';
import type { ClientModel } from '@/types/models';

interface IClientsState {
  clients: ClientModel[];
}

interface IClientsActions {
  setClients: (clients: ClientModel[]) => void;
}

export const useClients = create<IClientsState & IClientsActions>((set) => ({
  clients: [],
  setClients: (clients: ClientModel[]) => set({ clients }),
}));
