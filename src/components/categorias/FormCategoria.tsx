// components/categorias/FormularioCategoria.tsx
import { useState, useEffect } from "react";
import type { Categoria } from "@/models/Categoria";

interface Props {
  categoria?: Categoria | null;
  onSalvar: (dados: Omit<Categoria, 'id'>) => void;
  onCancelar: () => void;
}

export function FormularioCategoria({ categoria, onSalvar, onCancelar }: Props) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    cor: "#7C3AED",
    destaque: false
  });

  // Inicializar form quando editar
  useEffect(() => {
    if (categoria) {
      setFormData({
        nome: categoria.nome,
        descricao: categoria.descricao || "",
        cor: categoria.cor,
        destaque: categoria.destaque || false
      });
    } else {
      setFormData({
        nome: "",
        descricao: "",
        cor: "#7C3AED",
        destaque: false
      });
    }
  }, [categoria]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar(formData);
  };

  const coresDisponiveis = [
    "#7C3AED", // Violet
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow/Orange
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#EC4899", // Pink
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground block mb-2">
          NOME DA CATEGORIA *
        </label>
        <input
          type="text"
          required
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="
            w-full p-3 rounded-lg
            bg-[#F8FAFC] dark:bg-[#0F172A]
            text-[#0F172A] dark:text-[#F8FAFC]
            border border-[#9CA3AF] dark:border-[#64748B]
            placeholder:text-[#64748B] dark:placeholder:text-[#9CA3AF]
            text-sm
          "
          placeholder="Ex: Seguro, Plano, Produto..."
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground block mb-2">
          DESCRIÇÃO
        </label>
        <textarea
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          className="
            w-full p-3 rounded-lg
            bg-[#F8FAFC] dark:bg-[#0F172A]
            text-[#0F172A] dark:text-[#F8FAFC]
            border border-[#9CA3AF] dark:border-[#64748B]
            placeholder:text-[#64748B] dark:placeholder:text-[#9CA3AF]
            text-sm
            min-h-[100px]
          "
          placeholder="Descrição da categoria..."
          rows={4}
        />
      </div>

      {/* Cor */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground block mb-2">
          COR DE IDENTIFICAÇÃO
        </label>
        
        <div className="mb-3">
          <div
            className="w-12 h-12 rounded-lg mb-2 border border-slate-300 dark:border-slate-700"
            style={{ backgroundColor: formData.cor }}
          />
          <input
            type="color"
            value={formData.cor}
            onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
            className="w-full h-10 cursor-pointer"
          />
        </div>

        {/* Paleta de cores */}
        <div className="flex flex-wrap gap-2 mt-2">
          {coresDisponiveis.map((cor) => (
            <button
              key={cor}
              type="button"
              onClick={() => setFormData({ ...formData, cor })}
              className={`
                w-8 h-8 rounded-full border-2
                ${formData.cor === cor ? "border-slate-900 dark:border-white scale-110" : "border-transparent"}
                transition-all
              `}
              style={{ backgroundColor: cor }}
              title={cor}
            />
          ))}
        </div>
      </div>

      {/* Destaque */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.destaque}
            onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
            className="w-4 h-4 text-violet-600 rounded"
          />
          <span className="text-sm font-medium">Marcar como destaque</span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Categorias em destaque aparecem primeiro nas listagens
        </p>
      </div>

      {/* Ações */}
      <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="submit"
          className="
            flex-1 py-3 rounded-lg text-sm font-medium
            bg-violet-600 text-white
            hover:bg-violet-700 transition-colors
          "
        >
          {categoria ? "Atualizar" : "Criar"} Categoria
        </button>

        <button
          type="button"
          onClick={onCancelar}
          className="
            flex-1 py-3 rounded-lg text-sm font-medium
            bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300
            hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors
          "
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}