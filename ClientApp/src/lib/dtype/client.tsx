import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useClients } from '@/stores/clients.store';

import type { FC } from 'react';
import type { OrderModel } from '@/types/models';
import type { DTypeConfigItem } from '@/types/dtype';

export const ClientsSelector: FC<{ clientId: number }> = ({ clientId }) => {
  const { clients } = useClients();
  const [value, setValue] = useState<number>();

  useEffect(() => {
    setValue(clientId);
  }, [clientId]);

  return (
    <Select
      value={value}
      onChange={(value) => setValue(value)}
      showSearch={true}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={clients.map((client) => ({
        value: client.id,
        label: `${client.lastName} ${client.firstName}`,
      }))}
    />
  );
};

const ClientDataType: DTypeConfigItem = {
  renderCell: (value: number) => {
    const { clients } = useClients.getState();
    const foundClient = clients.find((client) => client.id === value);

    if (!foundClient) return '-';
    return `${foundClient.lastName} ${foundClient.firstName}`;
  },
  renderFormItem: (record: OrderModel) => <ClientsSelector clientId={record.clientId} />,
};

export default ClientDataType;
