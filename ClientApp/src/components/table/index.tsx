import { useState } from 'react';
import { Form, Typography, Table as AntTable } from 'antd';
import { COLUMN_MIN_WIDTH } from '@/lib/constants';
import ModalForm from '@/components/modal-form';

import type { Dispatch, SetStateAction } from 'react';
import type { ColumnType } from 'antd/es/table';
import type { BaseModel } from '@/types/models';
import type { DType } from '@/lib/dtype';

import './index.css';

export interface TableColumn<T extends BaseModel>
  extends Omit<ColumnType<T>, 'dataIndex' | 'title'> {
  title: string;
  dataIndex: string;
  dtype?: DType;
  editable?: boolean;
}

interface TableProps<T extends BaseModel> {
  data: T[] | undefined;
  setData: Dispatch<SetStateAction<T[] | undefined>>;
  columns: TableColumn<T>[];
}

const Table = <T extends BaseModel>({ data, setData, columns }: TableProps<T>) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editingKey, setEditingKey] = useState<number | null>(null);

  const closeModal = () => {
    setOpenModal(false);
  };

  const edit = (record: Partial<T> & { id: T['id'] }) => {
    form.setFieldsValue(record);
    setOpenModal(true);
    setEditingKey(record.id);
  };

  const saveData = async () => {
    if (!data) return;

    try {
      const row = (await form.validateFields()) as T;

      const newData = [...data];
      const index = newData.findIndex((item) => editingKey === item.id);

      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row });
        setData(newData);
      } else {
        newData.push(row);
        setData(newData);
      }

      setEditingKey(null);
      closeModal();
    } catch (errInfo) {
      console.log('Validate failed:', errInfo);
    }
  };

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
    const additionalParams = col.dataIndex === 'id' ? { minWidth: 100, width: 100 } : {};
    return { minWidth: COLUMN_MIN_WIDTH, ...col, ...additionalParams };
  });

  return (
    <>
      {data && (
        <AntTable
          bordered={true}
          dataSource={data}
          columns={mergedColumns}
          tableLayout="auto"
          scroll={{ x: '100%' }}
        />
      )}
      <ModalForm
        className="edit-form"
        title="Edit"
        formInstance={form}
        fields={internalColumns}
        open={openModal}
        onClose={closeModal}
        onCancel={closeModal}
        onOk={saveData}
      />
    </>
  );
};

export default Table;
