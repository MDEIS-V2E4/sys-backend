import { describe, it, vi, expect } from 'vitest';
import pool from '../../config/db';
import { employeeEdit, employeeFindById, employeeList, employeeSave, employeeToggleStatus } from '../../repositories/employee.repository';
import { IEmployee } from '../../models/employee.model';

vi.mocked('../config/db');
describe('EmployeeRepository', () => {
  it('should return a list of employees', async () => {
    const mockEmployees: any[] = [
      {
        id: 57,
        first_name: 'testsssss',
        last_name: 'Núñez García',
        email: 'enunez.dev@outlook.comm',
        phone: '69119436',
        hire_date: '2025-03-18T00:00:00.000Z',
        job_title: 'Tester',
        salary: '21341.00',
        department_id: 1,
        manager_id: 12,
        status: 'Inactive',
        created_at: '2025-03-18T06:51:00.689Z',
        updated_at: '2025-03-18T06:51:00.689Z',
        department_name: 'Desarrollo',
        manager_name: 'Otro Mas Test',
      },
    ];

    pool.query = vi.fn().mockResolvedValue({
      rows: mockEmployees,
    });

    const employees = await employeeList();
    expect(employees).toEqual(mockEmployees);
  });
  it('should return null if not data', async () => {
    pool.query = vi.fn().mockResolvedValue({
      rows: [],
    });

    const employees = await employeeList();
    expect(employees).toEqual(null);
  });
  it('should save employee with code 1', async () => {
    const data = {
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
    pool.query = vi.fn().mockResolvedValue({
      rows: [
        {
          id: 1,
          ...data,
        },
      ],
    });
    const employee = await employeeSave(data);
    expect(employee.id).toEqual(1);
  });
  it('should return a employee by id', async () => {
    const mockProduct: IEmployee = {
      id: 57,
      first_name: 'testsssss',
      last_name: 'Núñez García',
      email: 'enunez.dev@outlook.comm',
      phone: '69119436',
      hire_date: '2025-03-18T00:00:00.000Z',
      job_title: 'Tester',
      salary: 21341,
      department_id: 1,
      manager_id: 12,
      status: 'Inactive',
      created_at: '2025-03-18T06:51:00.689Z',
      updated_at: '2025-03-18T06:51:00.689Z',
    };

    pool.query = vi.fn().mockResolvedValue({
      rows: [mockProduct],
    });

    const employee = await employeeFindById(57);
    expect(employee).toEqual(mockProduct);
  });
  it('should return null if not data by id', async () => {
    pool.query = vi.fn().mockResolvedValue({
      rows: [],
    });

    const employees = await employeeFindById(57);
    expect(employees).toEqual(null);
  });
  it('should edit employee with code 1', async () => {
    const data = {
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
    pool.query = vi.fn().mockResolvedValue({
      rows: [
        {
          ...data,
        },
      ],
    });
    const employee = await employeeEdit(data);
    expect(employee.id).toEqual(1);
  });
  it('should update state employee with code 1', async () => {
    const data = {
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
    pool.query = vi.fn().mockResolvedValue({
      rows: [
        {
          ...data,
        },
      ],
    });
    const employee = await employeeToggleStatus(data);
    expect(employee.id).toEqual(1);
  });
});
