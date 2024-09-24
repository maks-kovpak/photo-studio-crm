import { useState } from 'react';
import { Form, Typography, Popconfirm, Table as AntTable } from 'antd';
import EditableCell from '../editable-cell';

import type { Dispatch, SetStateAction, CSSProperties } from 'react';
import type { TableProps as AntTableProps } from 'antd';
import type { BaseModel } from '../../types/models';

interface TableProps<T extends BaseModel> {
  data: T[];
  setData: Dispatch<SetStateAction<T[]>>;
  // columns: TableColumn[];
}

interface TableColumn {
  title: string;
  dataIndex: string;
  width?: CSSProperties['width'];
  editable?: boolean;
  dtype?: string;
}

const Table = <T extends BaseModel>({ data, setData }: TableProps<T>) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: T) => record.id === editingKey;

  const edit = (record: Partial<T> & { id: T['id'] }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as T;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      dtype: 'number',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: AntTableProps<T>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return { ...col, minWidth: 200 };
    }

    return {
      ...col,
      minWidth: 200,
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
