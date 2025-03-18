import { IEmployee } from '../models/employee.model';
import { employeeEdit, employeeFindById, employeeList, employeeSave, employeeToggleStatus } from '../repositories/employee.repository';
import { response } from '../utils/response';

export async function getEmployeeListService(): Promise<any> {
  try {
    const getEmployee = await employeeList();
    if (!getEmployee) {
      return response('No hay datos');
    }
    return response('Datos del empleado', getEmployee);
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
    const getEmployeeById = await employeeFindById(id);
    if (!getEmployeeById) {
      return response('No hay datos del empleado');
    }
    return response('Datos del empleado', getEmployeeById);
  } catch (error: any) {
    console.error(error);
    throw response(error.message, {}, false);
  }
}

export async function updateEmployeeService(employeeData: IEmployee): Promise<any> {
  try {
    const updateEmployee = await employeeEdit(employeeData);
    const data = {
      id: updateEmployee.id,
      first_name: updateEmployee.first_name,
      last_name: updateEmployee.last_name,
      email: updateEmployee.email,
      phone: updateEmployee.phone,
      hire_date: updateEmployee.hire_date,
      job_title: updateEmployee.job_title,
      salary: updateEmployee.salary,
      department_id: updateEmployee.department_id,
      manager_id: updateEmployee.manager_id,
      status: updateEmployee.status,
    };
    return response('Empleado editado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}

export async function toggleStatusEmployeeService(employeeData: IEmployee): Promise<any> {
  try {
    const deleteEmployee = await employeeToggleStatus(employeeData);
    const data = {
      id: deleteEmployee.id,
      status: deleteEmployee.status,
    };
    return response('Estado de empleado modificado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}
