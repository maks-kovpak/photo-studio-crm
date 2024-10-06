import { useState } from 'react';
import { Form, Typography, Table as AntTable } from 'antd';
import { COLUMN_MIN_WIDTH } from '@/lib/constants';
import ModalForm from '@/components/modal-form';

import type { ColumnType } from 'antd/es/table';
import type { BaseModel } from '@/types/models';
import type { PatchBody } from '@/types/utils';
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
  columns: TableColumn<T>[];
  saveAction: (id: number, data: PatchBody<T>) => Promise<void>;
  tableLoading?: boolean;
  confirmLoading?: boolean;
}

const Table = <T extends BaseModel>({
  data,
  columns,
  saveAction,
  tableLoading,
  confirmLoading,
}: TableProps<T>) => {
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
    if (!data || !editingKey) return;

    try {
      const values = (await form.validateFields()) as T;

      await saveAction(editingKey, values);

      setEditingKey(null);
      closeModal();
    } catch (errInfo) {
      console.error('Validation failed:', errInfo);
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
          loading={tableLoading}
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
        confirmLoading={confirmLoading}
      />
    </>
  );
};

export default Table;
