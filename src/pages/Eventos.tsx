import { useState } from "react";
import ModalNovoEvento from "../components/ModalNovoEvento";
import TabelaEventos from "../components/TabelaEventos";
import type { Evento } from "../data/eventos";
import { useEventos } from "../hooks/useEventos";
import {useClientes} from "../hooks/useClientes";


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
   const {clientes} = useClientes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<Evento | null>(null);
  const [termoBusca, setTermoBusca] = useState ("");
  const [statusFiltro, setStatusFiltro] = useState <"Todos"| "Confirmado"| "Pendente"| "Cancelado">("Todos");
  const [ordenacao, setOrdenacao] = useState<"recentes" | "antigos"> ("recentes");

  const totalEventos = eventos.length;
  const confirmados = eventos.filter(
    (e)=> e.status === "Confirmado"
  ).length;

  const pendentes = eventos.filter(
    (e) => e.status === "Pendente"
  ).length;

  const cancelados = eventos.filter(
    (e) => e.status === "Cancelado"
  ).length;

  const handleSalvar = async (evento: Evento) => {
    await salvarEvento(evento, eventoEmEdicao);
    setEventoEmEdicao(null);
    setIsModalOpen(false);
   
  };
  const limparFiltros = () => {
  setTermoBusca("");
  setStatusFiltro("Todos");
  };
 
 const eventosFiltrados = eventos.filter((evento) => {
  const termo = termoBusca.toLowerCase();

  const matchBusca = evento.nome.toLowerCase().includes(termo);

  const matchStatus =
    statusFiltro === "Todos" || evento.status === statusFiltro;

  return matchBusca && matchStatus;
});

const eventosOrdenados = [...eventosFiltrados].sort((a, b) => {
  const dataA = new Date(a.data).getTime();
  const dataB = new Date(b.data).getTime();

  if (ordenacao === "recentes") {
    return dataB - dataA; 
  } else {
    return dataA - dataB; 
  }
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
        <div className="grid grid-cols-4 gap-4 mb-6 mt-4">
      <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">Total</p>
      <p className="text-2xl font-bold">{totalEventos}</p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg text-center">
      <p className="text-sm text-green-700">Confirmados</p>
      <p className="text-2xl font-bold text-green-700">
      {confirmados}
      </p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg text-center">
      <p className="text-sm text-yellow-700">Pendentes</p>
      <p className="text-2xl font-bold text-yellow-700">
      {pendentes}
      </p>
      </div>

      <div className="bg-red-100 p-4 rounded-lg text-center">
      <p className="text-sm text-red-700">Cancelados</p>
      <p className="text-2xl font-bold text-red-700">
      {cancelados}
      </p>
      </div>
      </div>
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
    className="flex-1 p-2 border rounded"
  />

  <select
  value={ordenacao}
  onChange={(e)=> setOrdenacao(e.target.value as "recentes" | "antigos")}
  className="p-2 border rounded">
    <option value="recentes">Mais recentes</option>
    <option value="antigos"> Mais antigos</option>
  </select>

  <button
    onClick={limparFiltros}
    className="p-2 border rounded bg-gray-100 hover:bg-gray-200"
  >
    Limpar
  </button>
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
    eventos={eventosOrdenados}
    clientes={clientes}
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
        clientes={clientes}
      />
    </div>
  );
}