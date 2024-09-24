import { useState } from 'react';
import { Form, Typography, Table as AntTable } from 'antd';
import { COLUMN_MIN_WIDTH } from './constants';
import EditableCell from '../editable-cell';

import type { Dispatch, SetStateAction, CSSProperties } from 'react';
import type { TableProps as AntTableProps } from 'antd';
import type { BaseModel } from '../../types/models';

interface TableColumn {
  title: string;
  dataIndex: string;
  width?: CSSProperties['width'];
  editable?: boolean;
  dtype?: string;
}

interface TableColumnWithRender<T extends BaseModel> extends TableColumn {
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface TableProps<T extends BaseModel> {
  data: T[];
  setData: Dispatch<SetStateAction<T[]>>;
  columns: TableColumn[];
}

const Table = <T extends BaseModel>({ data, setData, columns }: TableProps<T>) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null>(null);

  const isEditing = (record: T) => record.id === editingKey;

  const edit = (record: Partial<T> & { id: T['id'] }) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (id: T['id']) => {
    try {
      const row = (await form.validateFields()) as T;

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row });
        setData(newData);
        setEditingKey(null);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(null);
      }
    } catch (errInfo) {
      console.log('Validate failed:', errInfo);
    }
  };

  const internalColumns: TableColumnWithRender<T>[] = [
    ...columns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== null} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: AntTableProps<T>['columns'] = internalColumns.map((col) => {
    if (!col.editable) {
      return { minWidth: COLUMN_MIN_WIDTH, ...col };
    }

    return {
      minWidth: COLUMN_MIN_WIDTH,
      ...col,
      onCell: (record: T) => ({
        record,
        inputType: col?.dtype ?? 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <AntTable
        components={{ body: { cell: EditableCell } }}
        bordered={true}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        tableLayout="auto"
        pagination={{ onChange: cancel }}
      />
    </Form>
  );
};

export default Table;
