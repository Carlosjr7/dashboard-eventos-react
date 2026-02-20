import type { Evento } from "../data/eventos";

function deveFalhar(): boolean{
  return Math.random() <0.3;
}


let eventosDB: Evento[] = [
  {
    id: 1,
    nome: "Festa fim de ano",
    cliente: "Empresa X",
    data: "2026-01-01",
    status: "Confirmado",
  },
  {
    id: 2,
    nome: "Workshop Corporativo",
    cliente: "Empresa Y",
    data: "2026-02-05",
    status: "Pendente",
  },
];


const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export async function getEventos(): Promise<Evento[]> {
  await delay(800);
  if (deveFalhar()) {
    throw new Error ("Falha ao buscar eventos");
  }
  return [...eventosDB];
}


export async function createEvento(evento: Evento): Promise<Evento> {
  await delay(800);

  if (deveFalhar()) {
    throw new Error("Falha ao criar evento.");
  }

  eventosDB.push(evento);
  return evento;
}


export async function updateEvento(eventoAtualizado: Evento): Promise<Evento> {
  await delay(800);

  if (deveFalhar()){
    throw new Error("Falha ao atualizar evento.")
  }

  eventosDB = eventosDB.map((evento) =>
    evento.id === eventoAtualizado.id ? eventoAtualizado : evento
  );
  return eventoAtualizado;
}


export async function deleteEvento(id: number): Promise<void> {
  await delay(800);
  
  if (deveFalhar()){
    throw new Error("Falha ao excluir evento.");
  }
  eventosDB = eventosDB.filter((evento) => evento.id !== id);
}