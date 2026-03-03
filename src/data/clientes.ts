export interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

export const clientesMock: Cliente[] = [
  {
    id: 1,
    nome: "Empresa X",
    email: "contato@empresax.com",
    telefone: "11999999999",
  },
  {
    id: 2,
    nome: "Instituto Y",
    email: "contato@institutoy.com",
    telefone: "11888888888",
  },
  {
    id: 3,
    nome: "Marca Z",
    email: "contato@marcaz.com",
    telefone: "11777777777",
  },
];