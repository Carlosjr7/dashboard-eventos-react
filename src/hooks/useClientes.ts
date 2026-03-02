import { useEffect, useState } from "react";
import type { Cliente } from "../data/clientes";

const STORAGE_KEY = "dashboard-clientes";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos) as Cliente[];
    }
    return [];

  });

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const salvarCliente = (cliente: Cliente) => {
  setClientes((prev) => {
    const existe = prev.find((c) => c.id === cliente.id);

    if (existe) {
      
      return prev.map((c) => (c.id === cliente.id ? cliente : c));
    }

    
    return [...prev, { ...cliente, id: Date.now() }];
  });
};

const excluirCliente = (id: number) => {
  setClientes((prev) => prev.filter((c) => c.id !== id));
};

  useEffect(() => {
  setLoading(false);
}, []);

  useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
}, [clientes]);

  return {
    clientes,
    loading,
    erro,
    salvarCliente,
    excluirCliente,
  };
}