import { useEffect, useState } from "react";
import type { Evento } from "../data/eventos";
import {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../api/eventosApi";

const STORAGE_KEY = "dashboard-eventos";

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>(() => {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos) as Evento[];
    }

    return [];
  });

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroApi, setErroApi] = useState<string | null>(null);

  const [feedbackVisivel, setFeedbackVisivel] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");

  // 🔁 Controla exibição do feedback
  useEffect(() => {
    if (feedbackVisivel) {
      const timer = setTimeout(() => setFeedbackVisivel(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackVisivel]);

  // 💾 Salva no localStorage sempre que eventos mudarem
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
  }, [eventos]);

  // 🚀 Carregar eventos
  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const dadosSalvos = localStorage.getItem(STORAGE_KEY);

        if (dadosSalvos) {
          setEventos(JSON.parse(dadosSalvos) as Evento[]);
        } else {
          // 🔥 ALTERAÇÃO AQUI (não busca mais da API automaticamente)
          setEventos([]);
        }
      } catch {
        setErroApi("Erro ao carregar eventos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    carregarEventos();
  }, []);

  // 💾 Salvar evento
  const salvarEvento = async (
    evento: Evento,
    eventoEmEdicao: Evento | null
  ) => {
    try {
      setSalvando(true);

      if (eventoEmEdicao) {
        await updateEvento(evento);
      } else {
        await createEvento(evento);
      }

      setEventos((prev)=> {
        if (eventoEmEdicao){
          return prev.map((e)=> (e.id === evento.id ? evento: e ));
        } else {
          return [...prev, evento];
        }
      });

      setMensagemFeedback("Evento salvo com sucesso!");
      setFeedbackVisivel(true);
      setErroApi(null);
    } catch {
      setErroApi("Erro ao salvar o evento. Tente novamente.");
      throw new Error("Falha ao salvar");
    } finally {
      setSalvando(false);
    }
  };

  // 🗑️ Excluir evento
  const excluirEvento = async (id: number) => {
    try {
      await deleteEvento(id);

      setEventos ((prev) => prev.filter((e)=> e.id !== id));

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