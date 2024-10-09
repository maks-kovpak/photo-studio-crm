import dayjs from 'dayjs';
import { DatePicker, Input, InputNumber } from 'antd';
import { ClientDataType } from './client';

import type { StoreValue } from 'antd/es/form/interface';
import type { OrderModel } from '@/types/models';

export const DTypeConfig = {
  text: () => <Input />,
  number: () => <InputNumber style={{ width: '100%' }} />,
  price: () => <InputNumber prefix="₴" style={{ width: '100%' }} />,
  date: () => <DatePicker style={{ width: '100%' }} />,
  client: (record: OrderModel) => <ClientDataType clientId={record.clientId} />,
};

export const getValuePropsConfig: GetValuePropsConfig = {
  date: (value) => ({ value: value ? dayjs(value) : '' }),
};

export type DType = keyof typeof DTypeConfig;
export type GetValuePropsConfig = { [K in DType]?: (value: StoreValue) => Record<string, unknown> };
