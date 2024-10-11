import { InputNumber } from 'antd';

import type { DTypeConfigItem } from '@/types/dtype';

const PriceDataType: DTypeConfigItem = {
  renderCell: (value: number) => '₴' + value,
  renderFormItem: () => <InputNumber prefix="₴" style={{ width: '100%' }} />,
};

export default PriceDataType;
