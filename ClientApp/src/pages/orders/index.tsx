import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

import { ordersApi } from '@/api/orders';
import { useClients } from '@/stores/clients.store';

import Table from '@/components/table';

import type { PatchBody } from '@/types/utils';
import type { OrderModel } from '@/types/models';

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
    refetch: refetchOrders,
    isRefetching,
  } = useQuery('orders', async () => {
    return await ordersApi.getAll();
  });

  const updateMutation = useMutation({
    mutationFn: async (body: { id: number; data: PatchBody<OrderModel> }) => {
      await ordersApi.updateOrder(body.id, body.data);
    },
    onSuccess: async () => {
      await refetchOrders();
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
        />
      )}
    </>
  );
};

export default OrdersPage;
