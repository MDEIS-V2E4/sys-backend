export interface IEmployee {
    id?: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    hire_date: string; 
    job_title?: string;
    salary?: number;
    department_id?: number;
    manager_id?: number;
    status?: 'Active' | 'Inactive';
    created_at?: string;
    updated_at?: string;
  }
  