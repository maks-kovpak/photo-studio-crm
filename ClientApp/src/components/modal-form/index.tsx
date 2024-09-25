import { Form, FormInstance, Modal } from 'antd';
import { BaseModel } from '../../types/models';

import { DTypeConfig } from '../../lib/dtype';

import type { ModalProps } from 'antd';
import type { TableColumn } from '../table';

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
              name={field.dataIndex}
              style={{ margin: '1rem 0' }}
              rules={[
                {
                  required: true,
                  message: `Please input ${field.title}!`,
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
