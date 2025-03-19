import { describe, it, expect, vi } from 'vitest';
import {
  deleteClientService,
  getClientByIdService,
  getClientListService,
  getClientService,
  registerClientService,
  updateClientService,
} from '../../services/client.service';

import * as clientRepository from '../../repositories/client.repository';

vi.mock('../../repositories/client.repository');

describe('registerClientService', () => {
  it('should return not data clients', async () => {
    const mockClients = null;
    vi.spyOn(clientRepository, 'clientList').mockResolvedValue(mockClients);

    const response = await getClientListService();
    expect(response.message).toEqual('No hay datos');
  });

  it('should return a list of clients', async () => {
    const mockClients = [
      {
        id: 4,
        name: 'María Fernández',
        ci_nit: '43218765',
        document_type: 'NIT',
        email: 'maria.fernandez@email.com',
        status: 'Active',
        created_at: '2025-03-07T07:56:17.579Z',
        updated_at: '2025-03-07T07:56:17.579Z',
      },
    ];
    vi.spyOn(clientRepository, 'clientList').mockResolvedValue(mockClients);

    const response = await getClientListService();
    expect(response.data).toEqual(mockClients);
  });

  it('should handle errors and throw a response getClientListService', async () => {
    const errorMessage = 'Database connection failed';
    vi.spyOn(clientRepository, 'clientList').mockRejectedValue(new Error(errorMessage));

    await expect(getClientListService()).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should return not data clients by cinit', async () => {
    const mockClients = null;
    vi.spyOn(clientRepository, 'clientFindByCiNit').mockResolvedValue(mockClients);

    const response = await getClientService('1234567');
    expect(response.message).toEqual('No hay datos');
  });

  it('should return a clients', async () => {
    const mockClients = {
      id: 4,
      name: 'María Fernández',
      ci_nit: '43218765',
      document_type: 'NIT',
      email: 'maria.fernandez@email.com',
      status: 'Active',
      created_at: '2025-03-07T07:56:17.579Z',
      updated_at: '2025-03-07T07:56:17.579Z',
    };
    vi.spyOn(clientRepository, 'clientFindByCiNit').mockResolvedValue(mockClients);

    const response = await getClientService('43218765');
    expect(response.data).toEqual(mockClients);
  });

  it('should handle errors and throw a response getClientService', async () => {
    const errorMessage = 'Database connection failed';

    vi.spyOn(clientRepository, 'clientFindByCiNit').mockRejectedValue(new Error(errorMessage));

    await expect(getClientService('1234567')).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should register a new client', async () => {
    const newClient = {
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'juanperez@mail.com',
    };
    const savedEmployee = { id: 1, ...newClient };
    vi.spyOn(clientRepository, 'clientSave').mockResolvedValue(savedEmployee);

    const response = await registerClientService(newClient);
    expect(response.success).toEqual(true);
  });

  it('should handle errors and throw a response registerClientService', async () => {
    const errorMessage = 'Database connection failed';

    vi.spyOn(clientRepository, 'clientSave').mockRejectedValue(new Error(errorMessage));

    await expect(
      registerClientService({
        name: 'Juan Pérez',
        ciNit: '12345678',
        documentType: 'CI',
        email: 'juanperez@mail.com',
      })
    ).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should update a client', async () => {
    const client = {
      id: 1,
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'juanperez@mail.com',
    };
    vi.spyOn(clientRepository, 'clientEdit').mockResolvedValue(client);

    const response = await updateClientService(client);
    expect(response.success).toEqual(true);
  });

  it('should handle errors and throw a response updateClientService', async () => {
    const errorMessage = 'Database connection failed';

    vi.spyOn(clientRepository, 'clientEdit').mockRejectedValue(new Error(errorMessage));

    await expect(
      updateClientService({
        id: 1,
        name: 'Juan Pérez',
        ciNit: '12345678',
        documentType: 'CI',
        email: 'juanperez@mail.com',
      })
    ).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should delete a client', async () => {
    vi.spyOn(clientRepository, 'deleteClient').mockResolvedValue(true);

    const response = await deleteClientService('1');
    expect(response.success).toEqual(true);
  });

  it('should return message of error on fail delete', async () => {
    vi.spyOn(clientRepository, 'deleteClient').mockResolvedValue(false);

    const response = await deleteClientService('1');
    expect(response.message).toEqual('No se pudo eliminar');
  });

  it('should handle errors and throw a response updateClientService', async () => {
    const errorMessage = 'Database connection failed';

    vi.spyOn(clientRepository, 'deleteClient').mockRejectedValue(new Error(errorMessage));

    await expect(deleteClientService('1')).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });

  it('should return not data clients by id', async () => {
    const mockClients = null;
    vi.spyOn(clientRepository, 'clientFindById').mockResolvedValue(mockClients);

    const response = await getClientByIdService(1);
    expect(response.message).toEqual('No hay datos');
  });

  it('should return data clients by id', async () => {
    const mockClients = {
      id: 58,
      name: 'Juan Pérez',
      ci_nit: '6666666361',
      document_type: 'CI',
      email: 'juanperezmail@correo.com',
      status: 'Active',
      created_at: '2025-03-19T15:20:39.758Z',
      updated_at: '2025-03-19T15:20:39.758Z',
    };
    vi.spyOn(clientRepository, 'clientFindById').mockResolvedValue(mockClients);

    const response = await getClientByIdService(1);
    expect(response.data).toEqual(mockClients);
  });

  it('should handle errors and throw a response getClientByIdService', async () => {
    const errorMessage = 'Database connection failed';
    vi.spyOn(clientRepository, 'clientFindById').mockRejectedValue(new Error(errorMessage));

    await expect(getClientByIdService(1)).rejects.toEqual({
      message: errorMessage,
      data: {},
      success: false,
    });
  });
});
