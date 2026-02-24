import { useState } from "react";
import ModalNovoEvento from "../components/ModalNovoEvento";
import TabelaEventos from "../components/TabelaEventos";
import type { Evento } from "../data/eventos";
import { useEventos } from "../hooks/useEventos";

export default function Eventos() {
  const {
    eventos,
    loading,
    salvando,
    erroApi,
    feedbackVisivel,
    mensagemFeedback,
    salvarEvento,
    excluirEvento,
  } = useEventos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<Evento | null>(null);
  const [termoBusca, setTermoBusca] = useState ("");
  const [statusFiltro, setStatusFiltro] = useState <"Todos"| "Confirmado"| "Pendente"| "Cancelado">("Todos");

  const handleSalvar = async (evento: Evento) => {
    await salvarEvento(evento, eventoEmEdicao);
    setEventoEmEdicao(null);
    setIsModalOpen(false);
   
  };

 
 const eventosFiltrados = eventos.filter((evento) => {
  const termo = termoBusca.toLowerCase();

  const matchBusca =
    evento.nome.toLowerCase().includes(termo) ||
    evento.cliente.toLowerCase().includes(termo);

  const matchStatus =
    statusFiltro === "Todos" || evento.status === statusFiltro;

  return matchBusca && matchStatus;
});



  return (
    <div className="p-6">
      {feedbackVisivel && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
          {mensagemFeedback}
        </div>
      )}

      {erroApi && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
          {erroApi}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => {
            setEventoEmEdicao(null);
            setIsModalOpen(true);
          }}
        >
          Novo Evento
        </button>
      </div>
      <div className="mb-4 flex gap-4">
      <input
        type="text"
        placeholder="Buscar por nome ou cliente..."
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        className="flex-1 p-2 border  rounded"
      />
        <select
        value={statusFiltro}
        onChange={(e) => setStatusFiltro(e.target.value as any)}
        className="p-2 border rounded">
          <option value="Confirmado">Confirmado</option>
          <option value="Pendente">Pendente</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Mostrando {eventosFiltrados.length} de {eventos.length} eventos
        </div>

      {loading ? (
      <p>Carregando eventos...</p>
      ) : eventosFiltrados.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Nenhum evento encontrado.
        </div>

        
) : (
  <TabelaEventos
    eventos={eventosFiltrados}
    onEditar={(evento) => {
      setEventoEmEdicao(evento);
      setIsModalOpen(true);
    }}
    onExcluir={excluirEvento}
  />
)}

      <ModalNovoEvento
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEventoEmEdicao(null);
        }}
        onSave={handleSalvar}
        eventoInicial={eventoEmEdicao}
        erro={erroApi}
        isSaving={salvando}
      />
    </div>
  );
}