import { useState } from "react";
import ModalNovoEvento from "../components/ModalNovoEvento";
import TabelaEventos from "../components/TabelaEventos";
import type { Evento } from "../data/eventos";
import { useEventos } from "../hooks/useEventos";
import { useClientes } from "../hooks/useClientes";

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

  const { clientes } = useClientes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<Evento | null>(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<
    "Todos" | "Confirmado" | "Pendente" | "Cancelado"
  >("Todos");
  const [ordenacao, setOrdenacao] = useState<"recentes" | "antigos">("recentes");

  const totalEventos = eventos.length;

  const confirmados = eventos.filter(
    (e) => e.status === "Confirmado"
  ).length;

  const pendentes = eventos.filter(
    (e) => e.status === "Pendente"
  ).length;

  const cancelados = eventos.filter(
    (e) => e.status === "Cancelado"
  ).length;

  const percentualConfirmados = 
  totalEventos > 0 ? (confirmados / totalEventos) * 100 : 0;

  const percentualPendentes = 
  totalEventos > 0 ? (pendentes / totalEventos) * 100:0;

  const percentualCancelado =
  totalEventos > 0? (cancelados / totalEventos) * 100:0;

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

    const cliente = clientes.find(
      (c) => c.id === evento.clienteId
    );

    const nomeCliente = cliente?.nome.toLowerCase() || "";

    const matchBusca =
      evento.nome.toLowerCase().includes(termo) ||
      nomeCliente.includes(termo);

    const matchStatus =
      statusFiltro === "Todos" || evento.status === statusFiltro;

    return matchBusca && matchStatus;
  });

  const eventosOrdenados = [...eventosFiltrados].sort((a, b) => {
    const dataA = new Date(a.data).getTime();
    const dataB = new Date(b.data).getTime();

    return ordenacao === "recentes" ? dataB - dataA : dataA - dataB;
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

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
            📊
          </div>
          <div>
            <p className="text-sm text-gray-500">Total de eventos</p>
            <p className="text-2xl font-bold text-gray-800">
              {totalEventos}
            </p>
          </div>
        </div>

        
        <div className="bg-green-50 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
            ✔
          </div>
          <div>
            <p className="text-sm text-green-700">Confirmados</p>
            <div className="flex items-center gap-2">
              <p className="text-2x1 font-bold text-green-700">{confirmados}</p>
              <span className="text-sm text-green-600">
                ({Math.round(percentualConfirmados)}%)
                </span>
                </div>
          
        
        <div className="w-full h-2 bg-green-100 rounded-full">
        <div
        className="h-2 bg-green-500 rounded-full"
        style={{ width: `${percentualConfirmados}%` }}/>
        </div>
        </div>
        </div>
               
        <div className="bg-yellow-50 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100">
            ⏳
          </div>
          <div>
            <p className="text-sm text-green-700">Pendentes</p>
            <div className="flex items-center gap-2">
              <p className="text-2x1 font-bold text-green-700">{pendentes}</p>
              <span className="text-sm text-green-600">
                ({Math.round(percentualPendentes)}%)
                </span>
                </div>
          
        
        <div className="w-full h-2 bg-green-100 rounded-full">
        <div
        className="h-2 bg-green-500 rounded-full"
        style={{ width: `${percentualPendentes}%` }}/>
        </div>
        </div>
        </div>


        
        
        <div className="bg-yellow-50 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100">
            ⏳
          </div>
          <div>
            <p className="text-sm text-green-700">Cancelados</p>
            <div className="flex items-center gap-2">
              <p className="text-2x1 font-bold text-green-700">{cancelados}</p>
              <span className="text-sm text-green-600">
                ({Math.round(percentualCancelado)}%)
                </span>
                </div>
          
        
        <div className="w-full h-2 bg-green-100 rounded-full">
        <div
        className="h-2 bg-green-500 rounded-full"
        style={{ width: `${percentualCancelado}%` }}/>
        </div>
        </div>
        </div>
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
          onChange={(e) =>
            setOrdenacao(e.target.value as "recentes" | "antigos")
          }
          className="p-2 border rounded"
        >
          <option value="recentes">Mais recentes</option>
          <option value="antigos">Mais antigos</option>
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