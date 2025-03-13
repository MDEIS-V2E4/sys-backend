import { Request, Response } from 'express';
import {
  getClientListService,
  getClientService,
  registerClientService,
  updateClientService,
  deleteClientService,
  getClientByIdService,
} from '../services/client.service';

export const registerClientController = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;
    const result = await registerClientService(clientData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getClientListController = async (req: Request, res: Response) => {
  try {
    const result = await getClientListService();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getClientController = async (req: Request, res: Response) => {
  try {
    const { cinit } = req.params;
    const result = await getClientService(cinit);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;
    clientData.id = req.params.id;
    const result = await updateClientService(clientData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const deleteClientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteClientService(id);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getClientByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getClientByIdService(Number(id));
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};
