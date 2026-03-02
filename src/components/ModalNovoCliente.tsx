import { useState, useEffect } from "react";
import type { Cliente } from "../data/clientes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: Cliente) => void;
  clienteInicial?: Cliente | null;
};

export default function ModalNovoCliente({
  isOpen,
  onClose,
  onSave,
  clienteInicial,
}: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (clienteInicial) {
      setNome(clienteInicial.nome);
      setEmail(clienteInicial.email);
      setTelefone(clienteInicial.telefone);
    } else {
      setNome("");
      setEmail("");
      setTelefone("");
    }
  }, [clienteInicial]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const novoCliente: Cliente = {
      id: clienteInicial?.id ?? Date.now(),
      nome,
      email,
      telefone,
    };

    onSave(novoCliente);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {clienteInicial ? "Editar Cliente" : "Novo Cliente"}
        </h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}