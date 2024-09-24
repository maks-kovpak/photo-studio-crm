export interface BaseModel {
  id: number;
}

export interface ClientModel extends BaseModel {
  fullName: string;
  address: string;
  phone: string;
}
