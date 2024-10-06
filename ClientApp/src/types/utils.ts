import type { BaseModel } from './models';

export type PatchBody<T extends BaseModel> = Partial<Omit<T, 'id'>>;
