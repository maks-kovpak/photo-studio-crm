import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { ordersApi } from '@/api/orders';
import { useClients } from '@/stores/clients.store';

import Table from '@/components/table';

const useOrdersPageInit = () => {
  const { clients, fetchClients } = useClients();

  useEffect(() => {
    if (!clients.length) {
      void fetchClients();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

const OrdersPage = () => {
  useOrdersPageInit();

  const {
    isLoading,
    data: tableData,
    isRefetching,
  } = useQuery('orders', async () => {
    return await ordersApi.getAll();
  });

  return (
    <>
      {!isLoading && tableData && (
        <Table
          data={tableData.data}
          columns={tableData.columns}
          saveAction={() => Promise.resolve()} // TODO
          tableLoading={isRefetching}
        />
      )}
    </>
  );
};

export default OrdersPage;
