import pool from '../config/db';
import { IEmployee } from '../models/employee.model';

export const employeeList = async (): Promise<any> => {
  const res = await pool.query(
    `select e.*,d.name as department_name,(COALESCE(e2.first_name, '') || ' ' || COALESCE(e2.last_name, '')) as manager_name from employee e join department d on d.id=e.department_id left join employee e2 on e2.id=e.manager_id order by e.id desc`,
    []
  );
  return res.rows.length > 0 ? res.rows : null;
};

export const employeeSave = async (employee: IEmployee): Promise<any> => {
  const { first_name, last_name, email, phone, hire_date, job_title, salary, department_id, manager_id } = employee;

  const result = await pool.query(
    `INSERT INTO employee (first_name, last_name, email, phone, hire_date,job_title,salary,department_id,manager_id) 
       VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9) 
       RETURNING *`,
    [first_name, last_name, email, phone, hire_date, job_title, salary, department_id, manager_id]
  );

  const savedEmployee = result.rows[0];
  return savedEmployee;
};

export const employeeFindById = async (id: number): Promise<IEmployee | null> => {
  const res = await pool.query(
    `select e.*,d.name as department_name,(COALESCE(e2.first_name, '') || ' ' || COALESCE(e2.last_name, '')) as manager_name from employee e join department d on d.id=e.department_id left join employee e2 on e2.id=e.manager_id where e.id = $1`,
    [id]
  );
  return res.rows.length > 0 ? res.rows[0] : null;
};

export const employeeEdit = async (employee: IEmployee): Promise<any> => {
  const { id, first_name, last_name, email, phone, hire_date, job_title, salary, department_id, manager_id } = employee;

  const result = await pool.query(
    `UPDATE employee SET first_name=$2, last_name=$3, email=$4, phone=$5, hire_date=$6, job_title=$7,salary=$8,department_id=$9, manager_id=$10
       WHERE id=$1
       RETURNING *`,
    [id, first_name, last_name, email, phone, hire_date, job_title, salary, department_id, manager_id]
  );

  const savedEmployee = result.rows[0];
  return savedEmployee;
};

export const employeeToggleStatus = async (employee: IEmployee): Promise<any> => {
  const { id, status } = employee;

  const result = await pool.query(
    `UPDATE employee SET status=$2
       WHERE id=$1
       RETURNING *`,
    [id, status]
  );

  const savedEmployee = result.rows[0];
  return savedEmployee;
};
