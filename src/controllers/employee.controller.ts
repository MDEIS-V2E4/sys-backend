import { Request, Response } from 'express';
import { registerEmployeeService,getEmployeeListService } from '../services/employee.service';

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