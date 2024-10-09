import { useQuery } from 'react-query';
import { ordersApi } from '@/api/orders';
import Table from '@/components/table';

const OrdersPage = () => {
  const {
    isLoading,
    data: tableData,
    isRefetching,
  } = useQuery('orders', async () => {
    return (await ordersApi.getAll()).data;
  });

  return (
    <>
      {!isLoading && tableData && (
        <Table
          data={tableData.data}
          columns={tableData.columns}
          saveAction={() => Promise.resolve()}
          tableLoading={isRefetching}
        />
      )}
    </>
  );
};

export default OrdersPage;
