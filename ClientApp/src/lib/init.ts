import { useClients } from '@/stores/clients.store';

export const useInitApplication = () => {
  const { fetchClients } = useClients();

  return {
    onInit: () => {
      void fetchClients();
    },
  };
};
