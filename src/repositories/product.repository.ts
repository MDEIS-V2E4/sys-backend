import pool from '../config/db';
import { IProduct } from '../models/product.model';

export const productList = async (): Promise<any> => {
  const res = await pool.query(`SELECT * from products`);
  return res.rows.length > 0 ? res.rows : null;
};

export const productSave = async (product: IProduct): Promise<any> => {
  const { code, name, price } = product;

  const result = await pool.query(
    `INSERT INTO products (code, name, price) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
    [code, name, price]
  );

  const savedProduct = result.rows[0];
  return savedProduct;
};

export const productFindById = async (id: string): Promise<IProduct | null> => {
  const res = await pool.query(`SELECT * from products where id = $1`, [id]);
  return res.rows.length > 0 ? res.rows[0] : null;
};

export const productEdit = async (product: IProduct): Promise<any> => {
  const { id, code,name,price } = product;

  const result = await pool.query(
    `UPDATE products SET code=$2, name=$3, price=$4
       WHERE id=$1
       RETURNING *`,
    [id, code,name,price]
  );

  const savedProduct = result.rows[0];
  return savedProduct;
};

export const productToggleStatus = async (product: IProduct): Promise<any> => {
  const { id, status } = product;

  const result = await pool.query(
    `UPDATE products SET status=$2
       WHERE id=$1
       RETURNING *`,
    [id, status]
  );

  const savedProduct = result.rows[0];
  return savedProduct;
};
