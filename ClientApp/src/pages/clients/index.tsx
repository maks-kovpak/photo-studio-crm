import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { clientsApi } from '@/api/clients';
import { useClients } from '@/stores/clients.store';
import Table from '@/components/table';

import type { PatchBody } from '@/types/utils';
import type { ClientModel } from '@/types/models';

const ClientsPage = () => {
  const { setClients } = useClients();

  const {
    isLoading,
    data: tableData,
    refetch: refetchClients,
    isRefetching,
  } = useQuery('clients', async () => {
    return await clientsApi.getAll();
  });

  useEffect(() => {
    if (!tableData) return;
    setClients(tableData.data);
  }, [setClients, tableData]);

  const updateMutation = useMutation({
    mutationFn: async (body: { id: number; data: PatchBody<ClientModel> }) => {
      await clientsApi.updateClient(body.id, body.data);
    },
    onSuccess: async () => {
      await refetchClients();
    },
  });

  return (
    <>
      {!isLoading && tableData && (
        <Table
          data={tableData.data}
          columns={tableData.columns}
          saveAction={(id, data) => updateMutation.mutateAsync({ id, data })}
          tableLoading={isRefetching}
          confirmLoading={updateMutation.isLoading}
        />
      )}
    </>
  );
};

export default ClientsPage;
