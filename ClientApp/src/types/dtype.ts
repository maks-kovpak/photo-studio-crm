import { DTypeConfig } from '@/lib/dtype';

import type { ReactNode } from 'react';
import type { StoreValue } from 'antd/es/form/interface';

export type DTypeConfigItem = {
  renderCell: DTypeRenderCell;
  renderFormItem: DTypeRenderFormItem<StoreValue>;
  getValueProps?: DTypeGetValueProps;
  normalize?: DTypeNormalize;
};

export type DType = keyof typeof DTypeConfig;
export type DTypeRenderFormItem<T extends object> = (record?: T) => JSX.Element;
export type DTypeRenderCell = (value: StoreValue) => ReactNode;
export type DTypeGetValueProps = (value: StoreValue) => Record<string, unknown>;
export type DTypeNormalize = (value: StoreValue) => StoreValue;
