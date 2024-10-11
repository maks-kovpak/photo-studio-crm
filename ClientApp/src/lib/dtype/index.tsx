import dayjs from 'dayjs';
import { DatePicker, Input, InputNumber } from 'antd';
import { ClientDataType } from './client';

import type { StoreValue } from 'antd/es/form/interface';
import type { OrderModel } from '@/types/models';
import { useClients } from '@/stores/clients.store';

export const DTypeConfig = {
  text: {
    renderCell: (value: string) => value,
    renderFormItem: () => <Input />,
  },
  number: {
    renderCell: (value: number) => value,
    renderFormItem: () => <InputNumber style={{ width: '100%' }} />,
  },
  price: {
    renderCell: (value: number) => '₴' + value,
    renderFormItem: () => <InputNumber prefix="₴" style={{ width: '100%' }} />,
  },
  date: {
    renderCell: (value: string) => {
      return dayjs(value).toDate().toLocaleString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
    renderFormItem: () => <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />,
  },
  client: {
    renderCell: (value: number) => {
      const { clients } = useClients.getState();
      const foundClient = clients.find((client) => client.id === value);

      if (!foundClient) return '-';
      return `${foundClient.lastName} ${foundClient.firstName}`;
    },
    renderFormItem: (record: OrderModel) => <ClientDataType clientId={record.clientId} />,
  },
};

export const getValuePropsConfig: GetValuePropsConfig = {
  date: (value) => ({ value: value ? dayjs(value) : '' }),
};

export type DType = keyof typeof DTypeConfig;
export type DTypeRenderFunc<T extends object> = (record?: T) => JSX.Element;

export type GetValuePropsConfig = { [K in DType]?: (value: StoreValue) => Record<string, unknown> };
