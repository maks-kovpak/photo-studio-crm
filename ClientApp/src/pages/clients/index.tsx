import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { clientsApi } from '@/api/clients';
import Table from '@/components/table';

import type { ClientModel } from '@/types/models';

const ClientsPage = () => {
  const [tableData, setTableData] = useState<ClientModel[]>([]);

  const { isLoading, data: clients } = useQuery('clientsData', async () => {
    return (await clientsApi.getAll()).data;
  });

  useEffect(() => {
    if (!clients) return;
    setTableData(clients.data);
  }, [clients]);

  if (isLoading || !clients) return 'Loading...';

  return <Table data={tableData} setData={setTableData} columns={clients.columns} />;
};

export default ClientsPage;
