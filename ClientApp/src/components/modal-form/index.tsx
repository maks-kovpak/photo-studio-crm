import { Form, FormInstance, Modal } from 'antd';
import { DTypeConfig, getValuePropsConfig } from '@/lib/dtype';

import type { ModalProps } from 'antd';
import type { BaseModel } from '@/types/models';
import type { TableColumn } from '@/components/table';
import type { DTypeRenderFunc } from '@/lib/dtype';

interface ModalFormProps<T extends BaseModel> extends ModalProps {
  fields: TableColumn<T>[];
  formInstance: FormInstance<T>;
}

const ModalForm = <T extends BaseModel>({ fields, formInstance, ...props }: ModalFormProps<T>) => {
  return (
    <Modal forceRender={true} {...props}>
      <Form form={formInstance} component={false}>
        {fields
          .filter((field) => field.editable)
          .map((field) => {
            const itemConfig = DTypeConfig[field.dtype ?? 'text'];
            const render = itemConfig.renderFormItem as DTypeRenderFunc<T>;

            return (
              <Form.Item
                label={field.title}
                layout="vertical"
                required={false}
                key={field.dataIndex}
                name={field.dataIndex}
                getValueProps={field.dtype && getValuePropsConfig[field.dtype]}
                rules={[
                  {
                    required: true,
                    message: 'Please input this field!',
                  },
                ]}
              >
                {render(formInstance.getFieldsValue())}
              </Form.Item>
            );
          })}
      </Form>
    </Modal>
  );
};

export default ModalForm;
