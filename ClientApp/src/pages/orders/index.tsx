import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ordersApi } from '@/api/orders';
import Table from '@/components/table';

import type { OrderModel } from '@/types/models';

const OrdersPage = () => {
  const [tableData, setTableData] = useState<OrderModel[]>();

  const { isLoading, data: orders } = useQuery('ordersData', async () => {
    return (await ordersApi.getAll()).data;
  });

  useEffect(() => {
    if (!orders) return;
    setTableData(orders.data);
  }, [orders]);

  return (
    <>
      {!isLoading && orders && (
        <Table data={tableData} setData={setTableData} columns={orders.columns} />
      )}
    </>
  );
};

export default OrdersPage;
