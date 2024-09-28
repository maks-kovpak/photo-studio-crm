import { useEffect, useState } from 'react';
import Table, { TableColumn } from '@/components/table';

import type { TableDefinition } from '@/types';
import type { ServiceModel } from '@/types/models';

const ServicesPage = () => {
  const [data, setData] = useState<ServiceModel[]>([]);
  const [columns, setColumns] = useState<TableColumn<ServiceModel>[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((clients: TableDefinition<ServiceModel>) => {
        setData(clients.data);
        setColumns(clients.columns);
      });
  }, []);

  return <Table data={data} setData={setData} columns={columns} />;
};

export default ServicesPage;
