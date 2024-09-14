// src/services/ProductoService.ts
import { IProductoRepository } from '../interfaces/IProductoRepository';
import { Producto } from '../models/producto';

export class ProductoService {
  private productoRepository: IProductoRepository;

  constructor(productoRepository: IProductoRepository) {
    this.productoRepository = productoRepository;
  }

  async registrarProducto(producto: Producto): Promise<void> {
    await this.productoRepository.registrarProducto(producto);
  }

  async obtenerProductoPorSku(sku: string): Promise<Producto | null> {
    return await this.productoRepository.obtenerProductoPorSku(sku);
  }
}
