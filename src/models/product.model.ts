export interface IProduct {
  id?: number;
  code?: string;
  name: string;
  price: number;
  status?: 'Active' | 'Inactive';
}
