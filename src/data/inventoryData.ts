export type StatusType = "ativo" | "transferencia" | "baixado" | "extraviado";

export interface InventoryItem {
  id: string;
  patrimonio: string;
  descricao: string;
  status: StatusType;
  localizacao: string;
  valor: number;
  responsavel: string | null;
  pendencias: boolean;
  dataAquisicao: string;
  secretaria: string;
}

export const inventoryData: InventoryItem[] = [
  {
    id: "1",
    patrimonio: "PAT-001234",
    descricao: "Computador Desktop Dell OptiPlex",
    status: "ativo",
    localizacao: "Prédio Central",
    valor: 4500,
    responsavel: "Carlos Souza",
    pendencias: false,
    dataAquisicao: "2023-03-15",
    secretaria: "Educação",
  },
  {
    id: "2",
    patrimonio: "PAT-001235",
    descricao: "Impressora HP LaserJet Pro",
    status: "ativo",
    localizacao: "Prédio Central",
    valor: 2800,
    responsavel: "Carlos Souza",
    pendencias: false,
    dataAquisicao: "2023-04-20",
    secretaria: "Educação",
  },
  {
    id: "3",
    patrimonio: "PAT-002341",
    descricao: "Veículo Fiat Uno",
    status: "transferencia",
    localizacao: "Almoxarifado",
    valor: 45000,
    responsavel: "Mariana Lima",
    pendencias: true,
    dataAquisicao: "2021-08-10",
    secretaria: "Educação",
  },
  {
    id: "4",
    patrimonio: "PAT-002342",
    descricao: "Ar Condicionado Split 12000 BTUs",
    status: "transferencia",
    localizacao: "Almoxarifado",
    valor: 3200,
    responsavel: "Mariana Lima",
    pendencias: false,
    dataAquisicao: "2022-11-05",
    secretaria: "Educação",
  },
  {
    id: "5",
    patrimonio: "PAT-003456",
    descricao: "Projetor Epson PowerLite",
    status: "baixado",
    localizacao: "Arquivo Inativo",
    valor: 5200,
    responsavel: null,
    pendencias: false,
    dataAquisicao: "2019-02-28",
    secretaria: "Educação",
  },
  {
    id: "6",
    patrimonio: "PAT-003457",
    descricao: "Monitor LG 24 polegadas",
    status: "baixado",
    localizacao: "Arquivo Inativo",
    valor: 1200,
    responsavel: null,
    pendencias: false,
    dataAquisicao: "2020-06-15",
    secretaria: "Educação",
  },
  {
    id: "7",
    patrimonio: "PAT-004567",
    descricao: "Notebook Lenovo ThinkPad",
    status: "extraviado",
    localizacao: "Desconhecida",
    valor: 6800,
    responsavel: null,
    pendencias: true,
    dataAquisicao: "2022-01-10",
    secretaria: "Educação",
  },
  {
    id: "8",
    patrimonio: "PAT-004568",
    descricao: "Câmera Digital Canon",
    status: "extraviado",
    localizacao: "Desconhecida",
    valor: 3500,
    responsavel: null,
    pendencias: true,
    dataAquisicao: "2021-09-22",
    secretaria: "Educação",
  },
  {
    id: "9",
    patrimonio: "PAT-005678",
    descricao: "Mesa de Escritório",
    status: "ativo",
    localizacao: "Prédio Central",
    valor: 850,
    responsavel: "Ana Paula",
    pendencias: false,
    dataAquisicao: "2023-01-05",
    secretaria: "Educação",
  },
  {
    id: "10",
    patrimonio: "PAT-005679",
    descricao: "Cadeira Ergonômica",
    status: "ativo",
    localizacao: "Prédio Central",
    valor: 1200,
    responsavel: "Ana Paula",
    pendencias: false,
    dataAquisicao: "2023-01-05",
    secretaria: "Educação",
  },
];

export const statusLabels: Record<StatusType, string> = {
  ativo: "Ativo",
  transferencia: "Em Transferência",
  baixado: "Baixado",
  extraviado: "Extraviado",
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};
