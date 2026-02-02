import type { Categoria } from "@/models/Categoria";
import { categoriasMock } from "@/assets/mocks/categoriasMock"; // Corrigido o caminho

let categorias: Categoria[] = [...categoriasMock];

export const categoriaService = {
  // Listar todas as categorias
  listar: async (): Promise<Categoria[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...categorias].sort((a, b) => {
          // Categorias em destaque primeiro
          if (a.destaque && !b.destaque) return -1;
          if (!a.destaque && b.destaque) return 1;
          return a.nome.localeCompare(b.nome);
        }));
      }, 300);
    });
  },

  // Buscar categoria por ID
  buscarPorId: async (id: number): Promise<Categoria | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categorias.find(c => c.id === id));
      }, 300);
    });
  },

  // Criar nova categoria
  criar: async (categoria: Omit<Categoria, 'id'>): Promise<Categoria> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const novaCategoria = {
          ...categoria,
          id: Date.now()
        };
        categorias.push(novaCategoria);
        resolve(novaCategoria);
      }, 300);
    });
  },

  // Atualizar categoria existente
  atualizar: async (id: number, dados: Partial<Categoria>): Promise<Categoria> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = categorias.findIndex(c => c.id === id);
        if (index === -1) {
          reject(new Error("Categoria não encontrada"));
          return;
        }

        categorias[index] = { ...categorias[index], ...dados };
        resolve(categorias[index]);
      }, 300);
    });
  },

  // Deletar categoria
  deletar: async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = categorias.findIndex(c => c.id === id);
        if (index === -1) {
          reject(new Error("Categoria não encontrada"));
          return;
        }
        
        categorias = categorias.filter(c => c.id !== id);
        resolve();
      }, 300);
    });
  },

  // Resetar para dados mockados
  resetar: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        categorias = [...categoriasMock];
        resolve();
      }, 300);
    });
  }
};