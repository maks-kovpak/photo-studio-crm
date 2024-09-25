import { useState } from 'react';
import { Form, Typography, Table as AntTable } from 'antd';
import { COLUMN_MIN_WIDTH } from './constants';
import ModalForm from '../modal-form';

import type { Dispatch, SetStateAction } from 'react';
import type { ColumnType } from 'antd/es/table';
import type { BaseModel } from '../../types/models';
import type { DType } from '../../lib/dtype';

export interface TableColumn<T extends BaseModel> extends Omit<ColumnType<T>, 'dataIndex'> {
  dataIndex: string;
  dtype?: DType;
  editable?: boolean;
}

interface TableProps<T extends BaseModel> {
  data: T[];
  setData: Dispatch<SetStateAction<T[]>>;
  columns: TableColumn<T>[];
}

const Table = <T extends BaseModel>({ data, setData, columns }: TableProps<T>) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);

  const edit = (record: Partial<T> & { id: T['id'] }) => {
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  // const cancel = () => {
  //   setEditingKey(null);
  // };

  // const save = async (id: T['id']) => {
  //   try {
  //     const row = (await form.validateFields()) as T;

  //     const newData = [...data];
  //     const index = newData.findIndex((item) => id === item.id);

  //     if (index > -1) {
  //       newData.splice(index, 1, { ...newData[index], ...row });
  //       setData(newData);
  //       setEditingKey(null);
  //     } else {
  //       newData.push(row);
  //       setData(newData);
  //       setEditingKey(null);
  //     }
  //   } catch (errInfo) {
  //     console.log('Validate failed:', errInfo);
  //   }
  // };

  const internalColumns: TableColumn<T>[] = [
    ...columns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: 200,
      render: (_: any, record: T) => {
        return <Typography.Link onClick={() => edit(record)}>Edit</Typography.Link>;
      },
    },
  ];

  const mergedColumns = internalColumns.map((col) => {
    return { minWidth: COLUMN_MIN_WIDTH, ...col };
  });

  return (
    <>
      <AntTable bordered={true} dataSource={data} columns={mergedColumns} tableLayout="auto" />
      <ModalForm title="Edit" formInstance={form} fields={internalColumns} open={openModal} />
    </>
  );
};

export default Table;
