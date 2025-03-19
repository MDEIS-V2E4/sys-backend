import { describe, it, expect, vi } from 'vitest';
import pool from '../../config/db';
import { productSaveDetails } from '../../repositories/saleProduct.repository';
import { ISaleProduct } from '../../models/saleProduct.model';

vi.mock('../../config/db');

describe('SaleProductRepository', () => {
  it('should save product details and return the saved product', async () => {
    const mockSaleProduct: ISaleProduct = {
      saleId: 1,
      productId: 1,
      quantity: 2,
      price: 100,
      subtotal: 200,
    };

    const mockResult = {
      rows: [mockSaleProduct],
    };

    pool.query = vi.fn().mockResolvedValue(mockResult);

    const savedProduct = await productSaveDetails(mockSaleProduct);
    expect(savedProduct).toEqual(mockSaleProduct);
  });
});