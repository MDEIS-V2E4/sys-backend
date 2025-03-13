import pool from '../config/db';
import { IEmployee } from '../models/employee.model';

export const employeeList = async (): Promise<any> => {
  const res = await pool.query(`select * from employee`, []);
  return res.rows.length > 0 ? res.rows : null;
};

export const employeeSave = async (employee: IEmployee): Promise<any> => {
  const { first_name, last_name, email, phone, hire_date,job_title,salary,department_id,manager_id } = employee;

  const result = await pool.query(
    `INSERT INTO employee (first_name, last_name, email, phone, hire_date,job_title,salary,department_id,manager_id) 
       VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9) 
       RETURNING *`,
    [first_name, last_name, email, phone, hire_date,job_title,salary,department_id,manager_id]
  );

  const savedEmployee = result.rows[0];
  return savedEmployee;
};

// export const clientFindByCiNit = async (cinit: string): Promise<IClient | null> => {
//   const res = await pool.query(`select * from clients where ci_nit = $1`, [cinit]);
//   return res.rows.length > 0 ? res.rows[0] : null;
// };

// export const clientFindById = async (id: number): Promise<IClient | null> => {
//   const res = await pool.query(`select * from clients where id = $1`, [id]);
//   return res.rows.length > 0 ? res.rows[0] : null;
// };

// export const deleteClient = async (id: string): Promise<boolean> => {
//   const res = (await pool.query(`delete from clients where id = $1`, [id])) || { rowCount: 0 };
//   console.log(res);
//   return true;
// };
