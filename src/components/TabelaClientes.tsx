import type { Cliente } from "../data/clientes";

interface TabelaClientesProps {
  clientes: Cliente[];
  onEditar: (cliente: Cliente) => void;
  onExcluir: (id: number) => void;
}

export default function TabelaClientes({
  clientes,
  onEditar,
  onExcluir,
}: TabelaClientesProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">Nome</th>
            <th className="p-4">Email</th>
            <th className="p-4">Telefone</th>
            <th className="p-4 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">{cliente.nome}</td>
              <td className="p-4">{cliente.email}</td>
              <td className="p-4">{cliente.telefone}</td>
              <td className="p-4 text-center flex gap-2 justify-center">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEditar(cliente)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => {
                    const confirmar = window.confirm(
                      "Tem certeza que deseja excluir este cliente?"
                    );
                    if (confirmar) {
                      onExcluir(cliente.id);
                    }
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}