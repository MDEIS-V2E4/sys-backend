import { IProduct } from '../models/product.model';
import { productEdit, productFindById, productList, productSave, productToggleStatus } from '../repositories/product.repository';
import { response } from '../utils/response';

export async function getProductListService(): Promise<any> {
  try {
    const products = await productList();

    return response('Listado de productos', products);
  } catch (error: any) {
    if (error?.detail) {
      throw new Error(error?.detail);
    }
    throw new Error('Error al obtener datos de la base de datos');
  }
}

export async function registerProductService(productData: IProduct): Promise<any> {
  try {
    const savedProduct = await productSave(productData);
    const data = {
      id: savedProduct.id,
      code: savedProduct.code,
      name: savedProduct.name,
      price: savedProduct.price,
      status: savedProduct.status,
    };
    return response('Producto registrado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}

export async function getProductService(id: string): Promise<any> {
  try {
    const product = await productFindById(id);

    return response('Datos del producto', product);
  } catch (error: any) {
    if (error?.detail) {
      throw new Error(error?.detail);
    }
    throw new Error('Error al obtener datos de la base de datos');
  }
}

export async function updateProductService(productData: IProduct): Promise<any> {
  try {
    const updateProduct = await productEdit(productData);
    const data = {
      id: updateProduct.id,
      code: updateProduct.code,
      name: updateProduct.name,
      price: updateProduct.price,
      status: updateProduct.status,
    };
    return response('Producto editado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}

export async function toggleStatusProductService(productData: IProduct): Promise<any> {
  try {
    const toggleStatusProduct = await productToggleStatus(productData);
    const data = {
      id: toggleStatusProduct.id,
      status: toggleStatusProduct.status,
    };
    return response('Estado de producto modificado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}
