import { useMutation, useQuery } from 'react-query';
import { clientsApi } from '@/api/clients';
import Table from '@/components/table';

import type { PatchBody } from '@/types/utils';
import type { ClientModel } from '@/types/models';

const ClientsPage = () => {
  const {
    isLoading,
    data: clients,
    refetch,
    isRefetching,
  } = useQuery('clientsData', async () => {
    return (await clientsApi.getAll()).data;
  });

  const updateClientMutation = useMutation({
    mutationFn: async (body: { id: number; data: PatchBody<ClientModel> }) => {
      await clientsApi.updateClient(body.id, body.data);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <>
      {!isLoading && clients && (
        <Table
          data={clients.data}
          columns={clients.columns}
          saveAction={(id, data) => updateClientMutation.mutateAsync({ id, data })}
          tableLoading={isRefetching}
          confirmLoading={updateClientMutation.isLoading}
        />
      )}
    </>
  );
};

export default ClientsPage;
