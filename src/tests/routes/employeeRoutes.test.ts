import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../../app';
import { getEmployeeListService, getEmployeeByIdService } from '../../services/employee.service';

vi.mock('../../services/employee.service');

describe('Employee Routes', () => {
  it('should return a list of employees', async () => {
    const mockEmployees = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        hire_date: '2025-03-07T11:56:17.579Z',
        job_title: 'Software Engineer',
        salary: '85000.00',
        department_id: 1,
        manager_id: 2,
        status: 'Active',
      },
      {
        id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        phone: '098-765-4321',
        hire_date: '2025-03-07T11:56:17.579Z',
        job_title: 'Product Manager',
        salary: '95000.00',
        department_id: 2,
        manager_id: 3,
        status: 'Active',
      },
    ];
    vi.mocked(getEmployeeListService).mockResolvedValue({
      success: true,
      message: 'Listado de empleados',
      data: mockEmployees,
    });

    const response = await request(app).get('/v1/employee/list');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Listado de empleados',
      data: mockEmployees,
    });
  });

  it('should return an employee by id', async () => {
    const mockEmployee = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      hire_date: '2025-03-07T11:56:17.579Z',
      job_title: 'Software Engineer',
      salary: '85000.00',
      department_id: 1,
      manager_id: 2,
      status: 'Active',
    };
    vi.mocked(getEmployeeByIdService).mockResolvedValue({
      success: true,
      message: 'Datos del empleado',
      data: mockEmployee,
    });

    const response = await request(app).get('/v1/employee/id/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Datos del empleado',
      data: mockEmployee,
    });
  });
});