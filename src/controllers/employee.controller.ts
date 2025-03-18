import { Request, Response } from 'express';
import { registerEmployeeService,getEmployeeListService, getEmployeeByIdService, updateEmployeeService, toggleStatusEmployeeService } from '../services/employee.service';

export const getEmployeeListController = async (req: Request, res: Response) => {
    try {
      const result = await getEmployeeListService();
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error);
      res.status(400).json(error);
    }
  };

export const registerEmployeeController = async (req: Request, res: Response) => {
  try {
    const employeeData = req.body;
    const result = await registerEmployeeService(employeeData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getEmployeeByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getEmployeeByIdService(Number(id));
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const updateEmployeeController = async (req: Request, res: Response) => {
  try {
    const employeeData = req.body;
    employeeData.id = req.params.id;
    const result = await updateEmployeeService(employeeData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const toggleStatusEmployeeController = async (req: Request, res: Response) => {
  try {
    const employeeData = req.body;
    employeeData.id = req.params.id;
    const result = await toggleStatusEmployeeService(employeeData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};