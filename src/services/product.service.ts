import { productFindById, productList } from '../repositories/product.repository';
import { response } from '../utils/response';

export async function getProductListService(): Promise<any> {
  try {
    const products = await productList();

    return response('Listado de productos', products);
  } catch (error: any) {
    console.error(error);
    throw response(error.message, {}, false);
  }
}

export async function getProductService(id: string): Promise<any> {
  try {
    const product = await productFindById(id);

    return response('Datos del producto', product);
  } catch (error: any) {
    console.error(error);
    throw response(error.message, {}, false);
  }
}
