import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../config/poolPostgress';

export class FabricanteStrategy implements IEntidadStrategy {
  private action: 'obtener';

  constructor(action: any) {
    this.action = action;
  }

  async execute(params: any[]): Promise<any> {
    const getQuery = {
      obtener: this.obtenerProveedoresQuery(),
    };

    const query = getQuery[this.action] || 'Acción no soportada';

    const result = await pool.query(query, params);
    if (result?.rows.length > 0) {
      return result.rows;
    }
    return [];
  }

  private obtenerProveedoresQuery(): string {
    const query = `
      SELECT * 
      FROM fabricantes
      ORDER BY id asc
    `;
    return query;
  }
}
