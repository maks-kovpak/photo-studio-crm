import { Input, InputNumber } from 'antd';

export const DTypeConfig = {
  number: <InputNumber />,
  text: <Input />,
};

export type DType = keyof typeof DTypeConfig;
