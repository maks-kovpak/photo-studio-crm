import type { TableColumn } from '@/components/table';
import type { BaseModel } from './models';

export interface TableDefinition<T extends BaseModel> {
  data: T[];
  columns: TableColumn<T>[];
}

export interface ResponseResult {
  statusCode: number;
  errorMessage?: string;
}
