import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { servicesApi } from '@/api/services';
import Table from '@/components/table';

import type { ServiceModel } from '@/types/models';

const ServicesPage = () => {
  const [tableData, setTableData] = useState<ServiceModel[]>();

  const { isLoading, data: services } = useQuery('servicesData', async () => {
    return (await servicesApi.getAll()).data;
  });

  useEffect(() => {
    if (!services) return;
    setTableData(services.data);
  }, [services]);

  return (
    <>
      {!isLoading && services && (
        <Table data={tableData} setData={setTableData} columns={services.columns} />
      )}
    </>
  );
};

export default ServicesPage;
