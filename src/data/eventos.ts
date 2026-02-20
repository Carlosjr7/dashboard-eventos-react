export interface Evento {
  id: number;
  nome: string;
  cliente: string;
  data: string;
  status: "Pendente" | "Confirmado" | "Cancelado";
}

export const eventosMock: Evento[] = [
  {
    id: 1,
    nome: "Festa de fim de ano",
    cliente: "Empresa X",
    data: "2026-01-01",
    status: "Confirmado",
  },
  {
    id: 2,
    nome: "Workshop Corporativo",
    cliente: "Instituto Y",
    data: "2026-02-05",
    status: "Pendente",
  },
  {
    id: 3,
    nome: "Coquetel VIP",
    cliente: "Marca Z",
    data: "2026-03-12",
    status: "Cancelado",
  },
];
