import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useClients } from '@/stores/clients.store';

import type { FC } from 'react';

export const ClientDataType: FC<{ clientId: number }> = ({ clientId }) => {
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
