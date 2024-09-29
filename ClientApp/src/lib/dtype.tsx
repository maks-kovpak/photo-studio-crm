import dayjs from 'dayjs';
import { DatePicker, Input, InputNumber } from 'antd';

import type { StoreValue } from 'antd/es/form/interface';

export const DTypeConfig = {
  text: <Input />,
  number: <InputNumber style={{ width: '100%' }} />,
  price: <InputNumber prefix="₴" style={{ width: '100%' }} />,
  date: <DatePicker />,
};

export const getValuePropsConfig: GetValuePropsConfig = {
  date: (value) => ({ value: value ? dayjs(value) : '' }),
};

export type DType = keyof typeof DTypeConfig;
export type GetValuePropsConfig = { [K in DType]?: (value: StoreValue) => Record<string, unknown> };
