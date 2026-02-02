import { itensMock } from "@/assets/mocks/itensCatalogoMock"; 
import type { ItemCatalogo } from "@/models/ItemCatalogo";

export const catalogoService = {
  listar: async (): Promise<ItemCatalogo[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(itensMock);
      }, 300); // simula API
    });
  },
};
