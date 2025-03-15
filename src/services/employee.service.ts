import { IEmployee } from '../models/employee.model';
import { employeeList,employeeSave } from '../repositories/employee.repository';
import { response } from '../utils/response';

export async function getEmployeeListService(): Promise<any> {
    try {
      const savedEmployee = await employeeList();
      if (!savedEmployee) {
        return response('No hay datos');
      }
      return response('Datos del empleado', savedEmployee);
    } catch (error: any) {
      console.error(error);
      throw response(error.message, {}, false);
    }
  }

export async function registerEmployeeService(employeeData: IEmployee): Promise<any> {
  try {
    const savedEmployee = await employeeSave(employeeData);
    const data = {
        id: savedEmployee.id,
        first_name: savedEmployee.first_name,
        last_name: savedEmployee.last_name,
        email: savedEmployee.email,
        phone: savedEmployee.phone,
        hire_date: savedEmployee.hire_date, 
        job_title: savedEmployee.job_title,
        salary: savedEmployee.salary,
        department_id: savedEmployee.department_id,
        manager_id: savedEmployee.manager_id,
        status: savedEmployee.status,
    };
    return response('Empleado registrado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}