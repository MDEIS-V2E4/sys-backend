import { describe, it, expect, vi } from 'vitest';
import { getProductListService, getProductService } from '../../services/product.service';
import * as productRepository from '../../repositories/product.repository';

vi.mock('../../repositories/product.repository');

describe('ProductService', () => {
  it('should return a product by id', async () => {
    const mockProduct = { name: 'Product 1', price: 100 };
    vi.spyOn(productRepository, 'productFindById').mockResolvedValue(mockProduct);

    const product = await getProductService('1');
    const productExpected = {
      data: {
        name: 'Product 1',
        price: 100,
      },
      message: 'Datos del producto',
      success: true,
    };
    expect(product).toEqual(productExpected);
  });

  it('should return all products', async () => {
    const mockProducts = [
      { name: 'Product 1', price: 100 },
      { name: 'Product 2', price: 200 },
    ];
    vi.spyOn(productRepository, 'productList').mockResolvedValue(mockProducts);

    const products = await getProductListService();
    const productsExpected = {
      data: [
        {
          name: 'Product 1',
          price: 100,
        },
        {
          name: 'Product 2',
          price: 200,
        },
      ],
      message: 'Listado de productos',
      success: true,
    };
    expect(products).toEqual(productsExpected);
  });
});
