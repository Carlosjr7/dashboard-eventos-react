import { useEffect, useState } from "react";
import type { Evento } from "../data/eventos";

interface ModalNovoEventoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evento: Evento) => Promise<void>;
  eventoInicial?: Evento | null;
  erro?: string | null;
  isSaving: boolean;
}

export default function ModalNovoEvento({
  isOpen,
  onClose,
  onSave,
  
  eventoInicial,
  erro,
  isSaving,
}: ModalNovoEventoProps) {
  
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState<
    "Pendente" | "Confirmado" | "Cancelado"
  >("Pendente");

 
  const [erros, setErros] = useState<{
    nome?: string;
    cliente?: string;
    data?: string;
  }>({});

  
  useEffect(() => {
    if (eventoInicial) {
      setNome(eventoInicial.nome);
      setCliente(eventoInicial.cliente);
      setData(eventoInicial.data);
      setStatus(eventoInicial.status);
    } else {
      setNome("");
      setCliente("");
      setData("");
      setStatus("Pendente");
    }
  }, [eventoInicial]);

  if (!isOpen) return null;

 
  const validarFormulario = () => {
    const novosErros: {
      nome?: string;
      cliente?: string;
      data?: string;
    } = {};

    if (!nome.trim()) {
      novosErros.nome = " Nome obrigatório.";
    }

    if (!cliente.trim()) {
      novosErros.cliente = "Cliente  obrigatório.";
    }

    if (!data) {
      novosErros.data = "Data obrigatória.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  
  const salvarEvento = async () => {
  const valido = validarFormulario();
  if (!valido) return;

  await onSave({
    id: eventoInicial ? eventoInicial.id : Date.now(),
    nome,
    cliente,
    data,
    status,
  });
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {eventoInicial ? "Editar Evento" : "Novo Evento"}
        </h2>

        
        {erro && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {erro}
          </div>
        )}

        <div className="flex flex-col gap-3">
         
          <input
            type="text"
            placeholder="Nome do evento"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setErros((prev) => ({ ...prev, nome: undefined }));
            }}
            className="border p-2 rounded"
          />
          {erros.nome && (
            <span className="text-sm text-red-600">{erros.nome}</span>
          )}

          
          <input
            type="text"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => {
              setCliente(e.target.value);
              setErros((prev) => ({ ...prev, cliente: undefined }));
            }}
            className="border p-2 rounded"
          />
          {erros.cliente && (
            <span className="text-sm text-red-600">{erros.cliente}</span>
          )}

          
          <input
            type="date"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
              setErros((prev) => ({ ...prev, data: undefined }));
            }}
            className="border p-2 rounded"
          />
          {erros.data && (
            <span className="text-sm text-red-600">{erros.data}</span>
          )}

         
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "Pendente" | "Confirmado" | "Cancelado"
              )
            }
            className="border p-2 rounded"
          >
            <option value="Pendente">Pendente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={salvarEvento}
            disabled={isSaving}
            className={`px-4 py-2 rounded text-white ${
            isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
>
          {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}