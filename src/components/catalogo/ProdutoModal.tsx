import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ItemCatalogo } from "@/models/ItemCatalogo";

interface Props {
  produto: ItemCatalogo;
  editando: boolean;
  onChange: (produto: ItemCatalogo) => void;
  onSave: () => void;
  onClose: () => void;
}

export function ProdutoModal({
  produto,
  editando,
  onChange,
  onSave,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {editando ? "Editar Produto" : "Novo Produto"}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            className="border rounded-lg p-3"
            placeholder="Titulo"
            value={produto.produto}
            onChange={(e) => onChange({ ...produto, produto: e.target.value })}
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Valor"
            type="number"
            value={produto.valor}
            onChange={(e) =>
              onChange({ ...produto,valor: Number(e.target.value) })
            }
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Categoria"
            type="string"
            value={produto.categoria}
            onChange={(e) =>
              onChange({ ...produto, categoria: String(e.target.value) })
            }
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Descrição"
            value={produto.descricao}
            onChange={(e) =>
              onChange({ ...produto, descricao: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onSave} className="flex-1 gap-2">
            <Plus size={16} />
            Salvar
          </Button>

          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
