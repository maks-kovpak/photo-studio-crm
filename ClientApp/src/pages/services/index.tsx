import { useMutation, useQuery } from 'react-query';
import { servicesApi } from '@/api/services';
import Table from '@/components/table';

import type { PatchBody } from '@/types/utils';
import type { ServiceModel } from '@/types/models';

const ServicesPage = () => {
  const {
    isLoading,
    data: services,
    refetch: refetchServices,
    isRefetching,
  } = useQuery('servicesData', async () => {
    return await servicesApi.getAll();
  });

  const updateMutation = useMutation({
    mutationFn: async (body: { id: number; data: PatchBody<ServiceModel> }) => {
      await servicesApi.updateService(body.id, body.data);
    },
    onSuccess: async () => {
      await refetchServices();
    },
  });

  return (
    <>
      {!isLoading && services && (
        <Table
          data={services.data}
          columns={services.columns}
          saveAction={(id, data) => updateMutation.mutateAsync({ id, data })}
          tableLoading={isRefetching}
          confirmLoading={updateMutation.isLoading}
        />
      )}
    </>
  );
};

export default ServicesPage;
