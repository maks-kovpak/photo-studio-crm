import { Form, FormInstance, Modal } from 'antd';
import { DTypeConfig } from '@/lib/dtype';

import type { ModalProps } from 'antd';
import type { BaseModel } from '@/types/models';
import type { TableColumn } from '@/components/table';

interface ModalFormProps<T extends BaseModel> extends ModalProps {
  fields: TableColumn<T>[];
  formInstance: FormInstance<T>;
}

const ModalForm = <T extends BaseModel>({ fields, formInstance, ...props }: ModalFormProps<T>) => {
  return (
    <Modal {...props}>
      <Form form={formInstance} component={false}>
        {fields
          .filter((field) => field.editable)
          .map((field) => (
            <Form.Item
              label={field.title}
              layout="vertical"
              required={false}
              key={field.dataIndex}
              name={field.dataIndex}
              rules={[
                {
                  required: true,
                  message: `Please input this field!`,
                },
              ]}
            >
              {DTypeConfig[field.dtype ?? 'text']}
            </Form.Item>
          ))}
      </Form>
    </Modal>
  );
};

export default ModalForm;
