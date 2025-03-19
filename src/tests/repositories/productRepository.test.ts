import { describe, it, expect, vi } from 'vitest';
import pool from '../../config/db';
import { productList, productFindById } from '../../repositories/product.repository';
import { IProduct } from '../../models/product.model';

vi.mock('../../config/db');

describe('ProductRepository', () => {
  it('should return a list of products', async () => {
    const mockProducts: IProduct[] = [
      { name: 'Product 1', price: 100 },
      { name: 'Product 2', price: 200 },
    ];

    pool.query = vi.fn().mockResolvedValue({
      rows: mockProducts,
    });

    const products = await productList();
    expect(products).toEqual(mockProducts);
  });

  it('should return a product by id', async () => {
    const mockProduct: IProduct = { name: 'Product 1', price: 100 };

    pool.query = vi.fn().mockResolvedValue({
      rows: [mockProduct],
    });

    const product = await productFindById('1');
    expect(product).toEqual(mockProduct);
  });

  it('should return null if no product is found by id', async () => {
    pool.query = vi.fn().mockResolvedValue({
      rows: [],
    });

    const product = await productFindById('999');
    expect(product).toBeNull();
  });
});
