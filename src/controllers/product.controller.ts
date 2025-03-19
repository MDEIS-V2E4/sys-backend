import { Request, Response } from 'express';
import { getProductService, getProductListService, registerProductService, updateProductService, toggleStatusProductService } from '../services/product.service';

export async function getProductListController(req: Request, res: Response) {
  try {
    const result = await getProductListService();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

export const registerProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await registerProductService(productData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export async function getProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await getProductService(id);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    productData.id = req.params.id;
    const result = await updateProductService(productData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const toggleStatusProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    productData.id = req.params.id;
    const result = await toggleStatusProductService(productData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};