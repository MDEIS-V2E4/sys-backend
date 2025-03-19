import { describe, it, expect, vi } from 'vitest';
import pool from '../../config/db';
import { clientEdit, clientFindByCiNit, clientFindById, clientList, clientSave, deleteClient } from '../../repositories/client.repository';
import { IClient } from '../../models/client.model';

vi.mock('../config/db');

describe('ClientRepository', () => {
  it('should return a list of clients', async () => {
    const mockClients: any[] = [
      {
        id: 4,
      },
    ];
    pool.query = vi.fn().mockResolvedValue({
      rows: mockClients,
    });
    const clients = await clientList();
    expect(clients).toEqual(mockClients);
  });

  it('should return a null clientList', async () => {
    pool.query = vi.fn().mockResolvedValue({
      rows: [],
    });

    const clients = await clientList();
    expect(clients).toEqual(null);
  });

  it('should return a clients by cinit', async () => {
    const mockClients: any = {
      id: 4,
    };
    pool.query = vi.fn().mockResolvedValue({
      rows: [mockClients],
    });
    const clients = await clientFindByCiNit('12345');
    expect(clients).toEqual(mockClients);
  });

  it('should return a null by cinit', async () => {
    pool.query = vi.fn().mockResolvedValue({
      rows: [],
    });
    const clients = await clientFindByCiNit('12345');
    expect(clients).toEqual(null);
  });

  it('should return a clients by id', async () => {
    const mockClients: any = {
      id: 4,
    };
    pool.query = vi.fn().mockResolvedValue({
      rows: [mockClients],
    });
    const clients = await clientFindById(1);
    expect(clients).toEqual(mockClients);
  });

  it('should return a null by id', async () => {
    pool.query = vi.fn().mockResolvedValue({
      rows: [],
    });

    const clients = await clientFindById(1);
    expect(clients).toEqual(null);
  });

  it('debería guardar un cliente en la base de datos', async () => {
    const mockClient: IClient = { id: 1, name: 'Juan Pérez', ciNit: '12345678', documentType: 'CI', email: 'juanperez@mail.com' };

    pool.query = vi.fn().mockResolvedValue({
      rows: [mockClient],
    });
    const savedClient = await clientSave(mockClient);
    expect(savedClient).toEqual(mockClient);
  });

  it('debería editar un cliente en la base de datos', async () => {
    const mockClient: IClient = { id: 1, name: 'Juan Pérez', ciNit: '12345678', documentType: 'CI', email: 'juanperez@mail.com' };

    pool.query = vi.fn().mockResolvedValue({
      rows: [mockClient],
    });
    const savedClient = await clientEdit(mockClient);
    expect(savedClient).toEqual(mockClient);
  });
  it('debería delete un cliente en la base de datos', async () => {
    pool.query = vi.fn().mockResolvedValue(true);
    const client = await deleteClient('1');
    expect(client).toEqual(true);
  });
});
