import { describe, it, vi, expect } from 'vitest';
import pool from '../../config/db';
import { employeeSave } from '../../repositories/employee.repository';

vi.mocked('../config/db');
describe('EmployeeRepository', () => {
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
    const sale = await employeeSave(data);
    expect(sale.id).toEqual(1);
  });
});