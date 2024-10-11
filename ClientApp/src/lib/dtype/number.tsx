import { InputNumber } from 'antd';

import type { DTypeConfigItem } from '@/types/dtype';

const NumberDataType: DTypeConfigItem = {
  renderCell: (value: number) => value,
  renderFormItem: () => <InputNumber style={{ width: '100%' }} />,
};

export default NumberDataType;
