import { useMutation, useQuery } from 'react-query';
import { servicesApi } from '@/api/services';
import Table from '@/components/table';

import type { PatchBody } from '@/types/utils';
import type { ServiceModel } from '@/types/models';

const ServicesPage = () => {
  const {
    isLoading,
    data: services,
    refetch,
    isRefetching,
  } = useQuery('servicesData', async () => {
    return (await servicesApi.getAll()).data;
  });

  const updateServiceMutation = useMutation({
    mutationFn: async (body: { id: number; data: PatchBody<ServiceModel> }) => {
      await servicesApi.updateService(body.id, body.data);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <>
      {!isLoading && services && (
        <Table
          data={services.data}
          columns={services.columns}
          saveAction={(id, data) => updateServiceMutation.mutateAsync({ id, data })}
          tableLoading={isRefetching}
          confirmLoading={updateServiceMutation.isLoading}
        />
      )}
    </>
  );
};

export default ServicesPage;
