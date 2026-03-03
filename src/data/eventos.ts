export interface Evento {
  id: number;
  nome: string;
  clienteId: number;

  data: string;
  status: "Pendente" | "Confirmado" | "Cancelado";
}

export const eventosMock: Evento[] = [
  {
    id: 1,
    nome: "Festa de fim de ano",
    clienteId: 1,
    data: "2026-01-01",
    status: "Confirmado",
  },
  {
    id: 2,
    nome: "Workshop Corporativo",
    clienteId: 2,
    data: "2026-02-05",
    status: "Pendente",
  },
  {
    id: 3,
    nome: "Coquetel VIP",
    clienteId: 3,
    data: "2026-03-12",
    status: "Cancelado",
  },
];
