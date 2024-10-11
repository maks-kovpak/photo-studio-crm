import { Input } from 'antd';

import type { DTypeConfigItem } from '@/types/dtype';

const TextDataType: DTypeConfigItem = {
  renderCell: (value: string) => value,
  renderFormItem: () => <Input />,
};

export default TextDataType;
