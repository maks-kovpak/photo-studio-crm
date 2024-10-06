export interface BaseModel {
  id: number;
}

export interface ClientModel extends BaseModel {
  firstName: string;
  lastName: string;
  patronymic: string;
  address: string;
  phone: string;
}

export interface OrderModel extends BaseModel {
  clientId: number;
  acceptanceDate: string;
  issuanceDate: string;
}

export interface OrderItemModel extends BaseModel {
  serviceId: number;
  quantity: number;
}

export interface ServiceModel extends BaseModel {
  name: string;
  description: string;
  price: number;
}
