import { IEmployee } from '../models/employee.model';
import { employeeEdit, employeeFindById, employeeList,employeeSave, employeeToggleStatus } from '../repositories/employee.repository';
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

export async function getEmployeeByIdService(id: number): Promise<any> {
  try {
    const getEmployee = await employeeFindById(id);
    if (!getEmployee) {
      return response('No hay datos del empleado');
    }
    return response('Datos del empleado', getEmployee);
  } catch (error: any) {
    console.error(error);
    throw response(error.message, {}, false);
  }
}

export async function updateEmployeeService(employeeData: IEmployee): Promise<any> {
  try {
    const savedEmployee = await employeeEdit(employeeData);
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
    return response('Empleado editado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}

export async function toggleStatusEmployeeService(employeeData: IEmployee): Promise<any> {
  try {
    const savedEmployee = await employeeToggleStatus(employeeData);
    const data = {
        id: savedEmployee.id,
        status: savedEmployee.status,
    };
    return response('Estado de empleado modificado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}