export type StatusType = "ativo" | "transferencia" | "baixado" | "extraviado" | "manutencao" | "cedido";

export interface Movement {
  id: string;
  date: string;
  type: "transferencia" | "alteracao" | "baixa" | "manutencao" | "aquisicao";
  description: string;
  user: string;
  from?: string;
  to?: string;
}

export interface InventoryItem {
  id: string;
  patrimonio: string;
  descricao: string;
  descricaoCompleta: string;
  categoria: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  status: StatusType;
  localizacao: string;
  setor: string;
  valor: number;
  valorAtual: number;
  depreciacaoMensal: number;
  metodoDepreciacao: string;
  responsavel: string | null;
  pendencias: boolean;
  dataAquisicao: string;
  notaFiscal: string;
  fornecedor: string;
  secretaria: string;
  observacoes: string;
  foto: string;
  movimentacoes: Movement[];
}

export const inventoryData: InventoryItem[] = [
  {
    id: "1",
    patrimonio: "PAT-001234",
    descricao: "Computador Desktop Dell OptiPlex",
    descricaoCompleta: "Computador Desktop Dell OptiPlex 7090, Processador Intel Core i7-11700, 16GB RAM DDR4, SSD 512GB NVMe, Windows 11 Pro, Monitor Dell 24\" incluso.",
    categoria: "Equipamento de Informática",
    marca: "Dell",
    modelo: "OptiPlex 7090",
    numeroSerie: "CN-0X9VY2-74261-1AB-00QR",
    status: "ativo",
    localizacao: "Prédio Central",
    setor: "Sala 102 - Administrativo",
    valor: 4500,
    valorAtual: 3825,
    depreciacaoMensal: 75,
    metodoDepreciacao: "Linear - 60 meses",
    responsavel: "Carlos Souza",
    pendencias: false,
    dataAquisicao: "2023-03-15",
    notaFiscal: "NF-2023/001234",
    fornecedor: "Dell Computadores Ltda",
    secretaria: "Educação",
    observacoes: "Equipamento destinado ao setor administrativo. Inclui garantia estendida de 3 anos.",
    foto: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2023-03-15", type: "aquisicao", description: "Aquisição via licitação pregão eletrônico nº 045/2023", user: "Sistema" },
      { id: "m2", date: "2023-03-20", type: "transferencia", description: "Transferência para setor administrativo", user: "Maria Santos", from: "Almoxarifado", to: "Sala 102" },
      { id: "m3", date: "2024-06-10", type: "alteracao", description: "Atribuição de responsável: Carlos Souza", user: "Ana Paula" },
    ]
  },
  {
    id: "2",
    patrimonio: "PAT-001235",
    descricao: "Impressora HP LaserJet Pro",
    descricaoCompleta: "Impressora Multifuncional HP LaserJet Pro MFP M428fdw, Impressão Laser Monocromática, Duplex Automático, Wi-Fi, Ethernet, USB, Scanner, Copiadora.",
    categoria: "Equipamento de Informática",
    marca: "HP",
    modelo: "LaserJet Pro MFP M428fdw",
    numeroSerie: "VNB3K12345",
    status: "ativo",
    localizacao: "Prédio Central",
    setor: "Sala 105 - Protocolo",
    valor: 2800,
    valorAtual: 2240,
    depreciacaoMensal: 46.67,
    metodoDepreciacao: "Linear - 60 meses",
    responsavel: "Carlos Souza",
    pendencias: false,
    dataAquisicao: "2023-04-20",
    notaFiscal: "NF-2023/001567",
    fornecedor: "HP Brasil Ltda",
    secretaria: "Educação",
    observacoes: "Uso compartilhado entre setores. Contrato de manutenção ativo.",
    foto: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2023-04-20", type: "aquisicao", description: "Aquisição via contrato de fornecimento", user: "Sistema" },
      { id: "m2", date: "2023-04-25", type: "transferencia", description: "Instalação no setor de protocolo", user: "João Silva", from: "Almoxarifado", to: "Sala 105" },
    ]
  },
  {
    id: "3",
    patrimonio: "PAT-002341",
    descricao: "Veículo Fiat Uno",
    descricaoCompleta: "Veículo Fiat Uno Way 1.0 Flex, Ano 2021/2022, Cor Branca, 4 Portas, Ar Condicionado, Direção Hidráulica, Vidros e Travas Elétricas.",
    categoria: "Veículo",
    marca: "Fiat",
    modelo: "Uno Way 1.0 Flex",
    numeroSerie: "9BD195187N0123456",
    status: "transferencia",
    localizacao: "Almoxarifado",
    setor: "Garagem Central",
    valor: 45000,
    valorAtual: 36000,
    depreciacaoMensal: 375,
    metodoDepreciacao: "Linear - 120 meses",
    responsavel: "Mariana Lima",
    pendencias: true,
    dataAquisicao: "2021-08-10",
    notaFiscal: "NF-2021/004567",
    fornecedor: "Fiat Concessionária Central",
    secretaria: "Educação",
    observacoes: "Em processo de transferência para Secretaria de Saúde. Aguardando documentação.",
    foto: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2021-08-10", type: "aquisicao", description: "Aquisição via licitação", user: "Sistema" },
      { id: "m2", date: "2021-08-15", type: "alteracao", description: "Primeiro emplacamento: ABC-1234", user: "Sistema" },
      { id: "m3", date: "2024-10-01", type: "transferencia", description: "Início do processo de transferência para Sec. Saúde", user: "Mariana Lima", from: "Sec. Educação", to: "Sec. Saúde" },
    ]
  },
  {
    id: "4",
    patrimonio: "PAT-002342",
    descricao: "Ar Condicionado Split 12000 BTUs",
    descricaoCompleta: "Ar Condicionado Split Hi Wall LG Dual Inverter 12000 BTUs, Classe A, Função Frio, Controle Remoto, Timer, Modo Sleep.",
    categoria: "Climatização",
    marca: "LG",
    modelo: "Dual Inverter S4-Q12JA3WC",
    numeroSerie: "LG2022AC001234",
    status: "manutencao",
    localizacao: "Almoxarifado",
    setor: "Oficina de Manutenção",
    valor: 3200,
    valorAtual: 2560,
    depreciacaoMensal: 26.67,
    metodoDepreciacao: "Linear - 120 meses",
    responsavel: "Mariana Lima",
    pendencias: false,
    dataAquisicao: "2022-11-05",
    notaFiscal: "NF-2022/007890",
    fornecedor: "Clima Frio Refrigeração",
    secretaria: "Educação",
    observacoes: "Recolhido para manutenção preventiva. Previsão de retorno: 15/01/2026.",
    foto: "https://images.unsplash.com/photo-1631545308936-bd6c3e3c3c74?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2022-11-05", type: "aquisicao", description: "Aquisição e instalação", user: "Sistema" },
      { id: "m2", date: "2025-12-20", type: "manutencao", description: "Recolhido para manutenção preventiva", user: "José Técnico" },
    ]
  },
  {
    id: "5",
    patrimonio: "PAT-003456",
    descricao: "Projetor Epson PowerLite",
    descricaoCompleta: "Projetor Epson PowerLite X41+ 3LCD, 3600 Lumens, XGA, HDMI, VGA, USB, Controle Remoto, Case de Transporte.",
    categoria: "Equipamento Audiovisual",
    marca: "Epson",
    modelo: "PowerLite X41+",
    numeroSerie: "X2JF123456",
    status: "baixado",
    localizacao: "Arquivo Inativo",
    setor: "Depósito de Patrimônio Baixado",
    valor: 5200,
    valorAtual: 0,
    depreciacaoMensal: 0,
    metodoDepreciacao: "Totalmente depreciado",
    responsavel: null,
    pendencias: false,
    dataAquisicao: "2019-02-28",
    notaFiscal: "NF-2019/001234",
    fornecedor: "Epson Brasil",
    secretaria: "Educação",
    observacoes: "Equipamento baixado por obsolescência. Lâmpada queimada, sem peças de reposição disponíveis no mercado.",
    foto: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2019-02-28", type: "aquisicao", description: "Aquisição", user: "Sistema" },
      { id: "m2", date: "2024-10-23", type: "baixa", description: "Baixa por obsolescência - Parecer Técnico nº 2024/123", user: "Comissão de Patrimônio" },
    ]
  },
  {
    id: "6",
    patrimonio: "PAT-003457",
    descricao: "Monitor LG 24 polegadas",
    descricaoCompleta: "Monitor LG 24MK430H-B, 24 polegadas, IPS, Full HD, HDMI, VGA, Modo Leitor, AMD FreeSync.",
    categoria: "Equipamento de Informática",
    marca: "LG",
    modelo: "24MK430H-B",
    numeroSerie: "LG2020MON005678",
    status: "baixado",
    localizacao: "Arquivo Inativo",
    setor: "Depósito de Patrimônio Baixado",
    valor: 1200,
    valorAtual: 0,
    depreciacaoMensal: 0,
    metodoDepreciacao: "Totalmente depreciado",
    responsavel: null,
    pendencias: false,
    dataAquisicao: "2020-06-15",
    notaFiscal: "NF-2020/003456",
    fornecedor: "LG Electronics",
    secretaria: "Educação",
    observacoes: "Baixado por dano irreparável na placa principal.",
    foto: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2020-06-15", type: "aquisicao", description: "Aquisição", user: "Sistema" },
      { id: "m2", date: "2024-10-23", type: "baixa", description: "Baixa por dano irreparável", user: "Comissão de Patrimônio" },
    ]
  },
  {
    id: "7",
    patrimonio: "PAT-004567",
    descricao: "Notebook Lenovo ThinkPad",
    descricaoCompleta: "Notebook Lenovo ThinkPad E14 Gen 2, Intel Core i5-1135G7, 8GB RAM, SSD 256GB, Tela 14\" Full HD, Windows 10 Pro.",
    categoria: "Equipamento de Informática",
    marca: "Lenovo",
    modelo: "ThinkPad E14 Gen 2",
    numeroSerie: "PF2ABCD1",
    status: "extraviado",
    localizacao: "Desconhecida",
    setor: "Não identificado",
    valor: 6800,
    valorAtual: 5440,
    depreciacaoMensal: 113.33,
    metodoDepreciacao: "Linear - 60 meses",
    responsavel: null,
    pendencias: true,
    dataAquisicao: "2022-01-10",
    notaFiscal: "NF-2022/000123",
    fornecedor: "Lenovo Brasil",
    secretaria: "Educação",
    observacoes: "Bem não localizado durante inventário 2025. Processo administrativo nº 2025/001234 em andamento.",
    foto: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2022-01-10", type: "aquisicao", description: "Aquisição", user: "Sistema" },
      { id: "m2", date: "2022-01-15", type: "alteracao", description: "Atribuição a Pedro Oliveira", user: "RH" },
      { id: "m3", date: "2025-09-25", type: "alteracao", description: "Marcado como extraviado - Inventário 2025", user: "Comissão de Inventário" },
    ]
  },
  {
    id: "8",
    patrimonio: "PAT-004568",
    descricao: "Câmera Digital Canon",
    descricaoCompleta: "Câmera Digital Canon EOS Rebel T7, 24.1MP, Full HD, Lente 18-55mm, Wi-Fi, NFC, Bolsa de Transporte.",
    categoria: "Equipamento Audiovisual",
    marca: "Canon",
    modelo: "EOS Rebel T7",
    numeroSerie: "CN2021CAM789012",
    status: "extraviado",
    localizacao: "Desconhecida",
    setor: "Não identificado",
    valor: 3500,
    valorAtual: 2625,
    depreciacaoMensal: 29.17,
    metodoDepreciacao: "Linear - 120 meses",
    responsavel: null,
    pendencias: true,
    dataAquisicao: "2021-09-22",
    notaFiscal: "NF-2021/005678",
    fornecedor: "Canon do Brasil",
    secretaria: "Educação",
    observacoes: "Último registro: emprestada para evento externo em 2024. Boletim de ocorrência registrado.",
    foto: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2021-09-22", type: "aquisicao", description: "Aquisição", user: "Sistema" },
      { id: "m2", date: "2024-05-10", type: "transferencia", description: "Empréstimo para evento externo", user: "Coordenação de Eventos", from: "Sec. Educação", to: "Evento Cultural 2024" },
      { id: "m3", date: "2025-09-25", type: "alteracao", description: "Marcado como extraviado", user: "Comissão de Inventário" },
    ]
  },
  {
    id: "9",
    patrimonio: "PAT-005678",
    descricao: "Mesa de Escritório",
    descricaoCompleta: "Mesa de Escritório em L, MDP 25mm, Cor Carvalho, 150x150x75cm, 2 Gavetas com Chave, Passa Cabos.",
    categoria: "Mobiliário",
    marca: "Marelli",
    modelo: "Mesa L Executive",
    numeroSerie: "MAR2023MESA001",
    status: "ativo",
    localizacao: "Prédio Central",
    setor: "Sala 201 - Direção",
    valor: 850,
    valorAtual: 765,
    depreciacaoMensal: 7.08,
    metodoDepreciacao: "Linear - 120 meses",
    responsavel: "Ana Paula",
    pendencias: false,
    dataAquisicao: "2023-01-05",
    notaFiscal: "NF-2023/000056",
    fornecedor: "Marelli Móveis Corporativos",
    secretaria: "Educação",
    observacoes: "Mobiliário em excelente estado de conservação.",
    foto: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2023-01-05", type: "aquisicao", description: "Aquisição e montagem", user: "Sistema" },
      { id: "m2", date: "2023-01-10", type: "alteracao", description: "Atribuição a Ana Paula - Diretora", user: "RH" },
    ]
  },
  {
    id: "10",
    patrimonio: "PAT-005679",
    descricao: "Cadeira Ergonômica",
    descricaoCompleta: "Cadeira Presidente Ergonômica, Base Giratória Cromada, Braços Reguláveis, Encosto Tela Mesh, Apoio Lombar, Suporta até 150kg.",
    categoria: "Mobiliário",
    marca: "Marelli",
    modelo: "Cadeira Presidente Mesh",
    numeroSerie: "MAR2023CAD002",
    status: "ativo",
    localizacao: "Prédio Central",
    setor: "Sala 201 - Direção",
    valor: 1200,
    valorAtual: 1080,
    depreciacaoMensal: 10,
    metodoDepreciacao: "Linear - 120 meses",
    responsavel: "Ana Paula",
    pendencias: false,
    dataAquisicao: "2023-01-05",
    notaFiscal: "NF-2023/000057",
    fornecedor: "Marelli Móveis Corporativos",
    secretaria: "Educação",
    observacoes: "Acompanha a mesa PAT-005678.",
    foto: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop",
    movimentacoes: [
      { id: "m1", date: "2023-01-05", type: "aquisicao", description: "Aquisição e montagem", user: "Sistema" },
      { id: "m2", date: "2023-01-10", type: "alteracao", description: "Atribuição a Ana Paula", user: "RH" },
    ]
  },
];

export const statusLabels: Record<StatusType, string> = {
  ativo: "Ativo",
  transferencia: "Em Transferência",
  baixado: "Baixado",
  extraviado: "Extraviado",
  manutencao: "Em Manutenção",
  cedido: "Cedido",
};

export const statusColors: Record<StatusType, string> = {
  ativo: "bg-emerald-500",
  transferencia: "bg-orange-400",
  baixado: "bg-amber-400",
  extraviado: "bg-purple-500",
  manutencao: "bg-blue-500",
  cedido: "bg-cyan-500",
};

export const movementTypeLabels: Record<Movement["type"], string> = {
  aquisicao: "Aquisição",
  transferencia: "Transferência",
  alteracao: "Alteração Cadastral",
  baixa: "Baixa",
  manutencao: "Manutenção",
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

export const getItemById = (id: string): InventoryItem | undefined => {
  return inventoryData.find(item => item.id === id);
};
