import { describe, it, expect, vi } from 'vitest';
import {
  getEmployeeListService,
  registerEmployeeService,
  getEmployeeByIdService,
  updateEmployeeService,
  toggleStatusEmployeeService,
} from '../../services/employee.service';
import * as employeeRepository from '../../repositories/employee.repository';

vi.mock('../../repositories/employee.repository');

describe('EmployeeService', () => {
  it('should return not data', async () => {
    const mockEmployees = null;
    vi.spyOn(employeeRepository, 'employeeList').mockResolvedValue(mockEmployees);

    const response = await getEmployeeListService();
    expect(response.message).toEqual('No hay datos');
  });

  it('should return a list of employees', async () => {
    const mockEmployees = [
      { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
      { id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com' },
    ];
    vi.spyOn(employeeRepository, 'employeeList').mockResolvedValue(mockEmployees);

    const response = await getEmployeeListService();
    expect(response.data).toEqual(mockEmployees);
  });

  it('should handle errors and throw a response getEmployeeListService', async () => {
    const errorMessage = 'Database connection failed';

    // Simulamos que employeeList lanza un error
    vi.spyOn(employeeRepository, 'employeeList').mockRejectedValue(new Error(errorMessage));

    await expect(getEmployeeListService()).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should register a new employee', async () => {
    const newEmployee = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'testAldo@gmail.com',
      phone: '123456789',
      hire_date: '2021-01-01',
      job_title: 'Developer',
      salary: 1000,
      department_id: 1,
      manager_id: 1,
    };
    const savedEmployee = { id: 1, ...newEmployee };
    vi.spyOn(employeeRepository, 'employeeSave').mockResolvedValue(savedEmployee);

    const response = await registerEmployeeService(newEmployee);
    expect(response.data).toEqual(savedEmployee);
  });

  it('should handle errors and throw a response registerEmployeeService', async () => {
    const errorMessage = 'Database connection failed';

    vi.spyOn(employeeRepository, 'employeeSave').mockRejectedValue(new Error(errorMessage));
    const newEmployee = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'testAldo@gmail.com',
      phone: '123456789',
      hire_date: '2021-01-01',
      job_title: 'Developer',
      salary: 1000,
      department_id: 1,
      manager_id: 1,
    };
    await expect(registerEmployeeService(newEmployee)).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should return not data get by id', async () => {
    const mockEmployees = null;
    vi.spyOn(employeeRepository, 'employeeFindById').mockResolvedValue(mockEmployees);

    const response = await getEmployeeByIdService(1);
    expect(response.message).toEqual('No hay datos del empleado');
  });

  it('should return an employee by id', async () => {
    const mockEmployee = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'testAldo@gmail.com',
      phone: '123456789',
      hire_date: '2021-01-01',
      job_title: 'Developer',
      salary: 1000,
      department_id: 1,
      manager_id: 1,
    };
    vi.spyOn(employeeRepository, 'employeeFindById').mockResolvedValue(mockEmployee);

    const response = await getEmployeeByIdService(1);
    expect(response.data).toEqual(mockEmployee);
  });

  it('should handle errors and throw a response getEmployeeByIdService', async () => {
    const errorMessage = 'Database connection failed';
    vi.spyOn(employeeRepository, 'employeeFindById').mockRejectedValue(new Error(errorMessage));

    await expect(getEmployeeByIdService(1)).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should update an employee', async () => {
    const updatedEmployee = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'testAldo@gmail.com',
      phone: '123456789',
      hire_date: '2021-01-01',
      job_title: 'Developer',
      salary: 1000,
      department_id: 1,
      manager_id: 1,
    };
    vi.spyOn(employeeRepository, 'employeeEdit').mockResolvedValue(updatedEmployee);

    const response = await updateEmployeeService(updatedEmployee);
    expect(response.data).toEqual(updatedEmployee);
  });

  it('should handle errors and throw a response updateEmployeeService', async () => {
    const errorMessage = 'Database connection failed';
    vi.spyOn(employeeRepository, 'employeeEdit').mockRejectedValue(new Error(errorMessage));
    const updatedEmployee = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'testAldo@gmail.com',
      phone: '123456789',
      hire_date: '2021-01-01',
      job_title: 'Developer',
      salary: 1000,
      department_id: 1,
      manager_id: 1,
    };
    await expect(updateEmployeeService(updatedEmployee)).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should toggle the status of an employee', async () => {
    const employee = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'testAldo@gmail.com',
      phone: '123456789',
      hire_date: '2021-01-01',
      job_title: 'Developer',
      salary: 1000,
      department_id: 1,
      manager_id: 1,
    };
    const toggledEmployee = { id: 1, status: 'active' };
    vi.spyOn(employeeRepository, 'employeeToggleStatus').mockResolvedValue(toggledEmployee);

    const response = await toggleStatusEmployeeService(employee);
    expect(response.data).toEqual(toggledEmployee);
  });

  it('should handle errors and throw a response toggleStatusEmployeeService', async () => {
    const errorMessage = 'Database connection failed';
    vi.spyOn(employeeRepository, 'employeeToggleStatus').mockRejectedValue(new Error(errorMessage));
    const employee = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'testAldo@gmail.com',
      phone: '123456789',
      hire_date: '2021-01-01',
      job_title: 'Developer',
      salary: 1000,
      department_id: 1,
      manager_id: 1,
    };
    await expect(toggleStatusEmployeeService(employee)).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });
});
