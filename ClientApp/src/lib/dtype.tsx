import { Input, InputNumber } from 'antd';

export const DTypeConfig = {
  text: <Input />,
  number: <InputNumber style={{ width: '100%' }} />,
  price: <InputNumber prefix="₴" style={{ width: '100%' }} />,
};

export type DType = keyof typeof DTypeConfig;
