import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../../app';
import { getProductListService, getProductService } from '../../services/product.service';

vi.mock('../../services/product.service');

describe('Product Routes', () => {
  it('should return a list of products', async () => {
    const mockProducts = [
      {
        id: 1,
        code: 'P001',
        name: 'Laptop HP Pavilion',
        price: '850.00',
        status: 'Active',
        created_at: '2025-03-07T11:56:17.579Z',
        updated_at: '2025-03-07T11:56:17.579Z',
      },
      {
        id: 2,
        code: 'P002',
        name: 'Monitor Samsung 24"',
        price: '220.50',
        status: 'Active',
        created_at: '2025-03-07T11:56:17.579Z',
        updated_at: '2025-03-07T11:56:17.579Z',
      },
    ];
    vi.mocked(getProductListService).mockResolvedValue({
      success: true,
      message: 'Listado de productos',
      data: mockProducts,
    });

    const response = await request(app).get('/v1/product/list');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Listado de productos',
      data: mockProducts,
    });
  });

  it('should return a product by id', async () => {
    const mockProduct = {
      id: 1,
      code: 'P001',
      name: 'Laptop HP Pavilion',
      price: '850.00',
      status: 'Active',
      created_at: '2025-03-07T11:56:17.579Z',
      updated_at: '2025-03-07T11:56:17.579Z',
    };
    vi.mocked(getProductService).mockResolvedValue({
      success: true,
      message: 'Datos del producto',
      data: mockProduct,
    });

    const response = await request(app).get('/v1/product/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Datos del producto',
      data: mockProduct,
    });
  });
});
