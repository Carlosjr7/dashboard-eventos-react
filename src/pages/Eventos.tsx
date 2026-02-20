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

  const handleSalvar = async (evento: Evento) => {
    await salvarEvento(evento, eventoEmEdicao);
    setEventoEmEdicao(null);
    setIsModalOpen(false);
  };

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

      {loading ? (
        <p>Carregando eventos...</p>
      ) : (
        <TabelaEventos
          eventos={eventos}
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