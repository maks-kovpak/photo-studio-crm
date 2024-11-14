import dayjs from 'dayjs';
import { DatePicker } from 'antd';

import type { DTypeConfigItem } from '@/types/dtype';

const DateDataType: DTypeConfigItem = {
  renderCell: (value: string) => {
    return dayjs(value).toDate().toLocaleString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  },
  renderFormItem: () => <DatePicker style={{ width: '100%' }} />,
  getValueProps: (value) => ({ value: value && dayjs(value) }),
  normalize: (value: dayjs.Dayjs) => value && value.format('YYYY-MM-DDTHH:mm:ss'),
};

export default DateDataType;
