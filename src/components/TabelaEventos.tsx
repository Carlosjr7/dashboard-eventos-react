import type { Evento } from "../data/eventos";
import type { Cliente} from "../data/clientes";

interface TabelaEventosProps {
  eventos: Evento[];
  clientes: Cliente[];
  onEditar: (evento: Evento) => void;
  onExcluir: (id: number) => void;
}

export default function TabelaEventos({
  eventos,
  clientes,
  onEditar,
  onExcluir,
}: TabelaEventosProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">Nome</th>
            <th className="p-4">Cliente</th>
            <th className="p-4">Data</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
        {eventos.map((evento) => {
        const cliente = clientes.find(
        (c) => c.id === evento.clienteId
        );
        console.log("EVENTO:", evento);
        console.log("CLIENTES:", clientes);

        return (
        <tr
        key={evento.id}
        className="border-b hover:bg-gray-50 transition"
        >
           <td className="p-4">{evento.nome}</td>
        <td className="p-4">{cliente?.nome ?? "Cliente não encontrado"}</td>
        <td className="p-4">{evento.data}</td>
        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              evento.status === "Confirmado"
                ? "bg-green-100 text-green-700"
                : evento.status === "Pendente"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {evento.status}
          </span>
        </td>

        <td className="p-4 text-center flex gap-2 justify-center">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => onEditar(evento)}
          >
            Editar
          </button>

          <button
            className="text-red-600 hover:underline"
            onClick={() => {
              const confirmar = window.confirm(
                "Tem certeza que deseja excluir este evento?"
              );
              if (confirmar) {
                onExcluir(evento.id);
              }
            }}
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
                 
  );
}