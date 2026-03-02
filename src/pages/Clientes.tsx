import { useState } from "react";
import { useClientes } from "../hooks/useClientes";
import TabelaClientes from "../components/TabelaClientes";
import type { Cliente } from "../data/clientes";

import ModalNovoCliente from "../components/ModalNovoCliente";

export default function Clientes() {
  const {clientes, loading, erro, salvarCliente, excluirCliente} = useClientes();

  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <p className="p-6">Carregando clientes</p>;
  }

  if (erro) {
    return <p className="p-6 text-red-600">{erro}</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => {
          setClienteEmEdicao(null);
          setIsModalOpen(true);
         }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
>
             Novo Cliente
        </button>
      </div>

      {clientes.length === 0? (
        <p className="text-gray-500">Nenhum cliente cadastrado</p>
      ): (
        <TabelaClientes
        clientes={clientes}
        onEditar={(cliente) => {
        setClienteEmEdicao(cliente);
        setIsModalOpen(true);
      }}
        onExcluir={excluirCliente}
        />
      )}
      <ModalNovoCliente
        isOpen={isModalOpen}
        onClose={() => {
       setIsModalOpen(false);
       setClienteEmEdicao(null);
      }}
  onSave={salvarCliente}
  clienteInicial={clienteEmEdicao}
/>
    </div>
  );
}