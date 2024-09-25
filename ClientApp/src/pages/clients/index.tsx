import { useEffect, useState } from 'react';
import Table, { TableColumn } from '@/components/table';

import type { TableDefinition } from '@/types';
import type { ClientModel } from '@/types/models';

const ClientsPage = () => {
  const [data, setData] = useState<ClientModel[]>([]);
  const [columns, setColumns] = useState<TableColumn<ClientModel>[]>([]);

  useEffect(() => {
    fetch('/api/clients')
      .then((res) => res.json())
      .then((clients: TableDefinition<ClientModel>) => {
        setData(clients.data);
        setColumns(clients.columns);
      });
  }, []);

  return <Table data={data} setData={setData} columns={columns} />;
};

export default ClientsPage;
