import { useEffect, useState } from "react";
import type { Evento } from "../data/eventos";
import { getEventos, createEvento, updateEvento, deleteEvento } from "../api/eventosApi";

 const STORAGE_KEY = "dashboard-eventos";

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>(()=> {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos) as Evento[];
    }
    return[];
  });
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroApi, setErroApi] = useState<string | null>(null);

  const [feedbackVisivel, setFeedbackVisivel] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");

 

  // Esconde feedback depois de alguns segundos
  useEffect(() => {
    if (feedbackVisivel) {
      const timer = setTimeout(() => setFeedbackVisivel(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackVisivel]);

  useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
}, [eventos]);

  // Carregar eventos ao iniciar
  useEffect(() => {
  const carregarEventos = async () => {
    try {
      const dadosSalvos = localStorage.getItem(STORAGE_KEY);

      if (dadosSalvos) {
        
        setEventos(JSON.parse(dadosSalvos) as Evento[]);
      } else {
        
        const dados = await getEventos();
        setEventos(dados);
      }
    } catch {
      setErroApi("Erro ao carregar eventos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  carregarEventos();
}, []);
  const salvarEvento = async (evento: Evento, eventoEmEdicao: Evento | null) => {
    try {
      setSalvando(true);

      if (eventoEmEdicao) {
        await updateEvento(evento);
      } else {
        await createEvento(evento);
      }

      const dados = await getEventos();
      setEventos(dados);

      setMensagemFeedback("Evento salvo com sucesso!");
      setFeedbackVisivel(true);
      setErroApi(null);
    } catch {
      setErroApi("Erro ao salvar o evento. Tente novamente.");
      throw new Error("Falha ao salvar"); // deixa o componente saber que falhou
    } finally {
      setSalvando(false);
    }
  };

  const excluirEvento = async (id: number) => {
    try {
      await deleteEvento(id);

      const dados = await getEventos();
      setEventos(dados);

      setMensagemFeedback("Evento excluído com sucesso!");
      setFeedbackVisivel(true);
      setErroApi(null);
    } catch {
      setErroApi("Erro ao excluir o evento. Tente novamente.");
    }
  };

  return {
    eventos,
    loading,
    salvando,
    erroApi,
    feedbackVisivel,
    mensagemFeedback,
    salvarEvento,
    excluirEvento,
  };
}