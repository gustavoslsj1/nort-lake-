// Dados detalhados de jogadores
export const players = [
  {
    id: 1,
    name: "Lucas Silva",
    position: "Armador",
    number: 7,
    avatar: "LS",
    age: 24,
    height: "1.82m",
    weight: "78kg",
    description:
      "Armador experiente com excelente visão de jogo e liderança. Capitão do time há 2 temporadas, conhecido por sua consistência nos lances livres e capacidade de organizar jogadas.",
    stats: {
      points: 18.5,
      assists: 7.2,
      rebounds: 3.1,
      steals: 1.8,
      blocks: 0.3,
      freeThrow: 85,
      threePoint: 38,
      fieldGoal: 47,
    },
    health: {
      status: "Saudável",
      lastCheckup: "2024-03-15",
      notes: "Ótima condição física",
      weight: 78,
      heartRate: 62,
      bodyFat: 12,
    },
    attendance: 95,
    gamesPlayed: 22,
    training: {
      kmPerSession: [5.2, 4.8, 5.5, 5.1, 4.9, 5.3, 5.0, 4.7],
      avgKm: 5.1,
      sessionsThisMonth: 12,
      totalSessions: 48,
    },
    financial: {
      totalPaid: 5400,
      pendingAmount: 0,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "05/01/2024" },
        { month: "Fev", amount: 450, status: "Pago", date: "03/02/2024" },
        { month: "Mar", amount: 450, status: "Pago", date: "02/03/2024" },
      ],
    },
    errors: [
      {
        type: "Perda de bola",
        count: 12,
        description: "Passes arriscados em transição",
      },
      { type: "Faltas ofensivas", count: 5, description: "Carrinho em drives" },
      {
        type: "Erros de leitura",
        count: 8,
        description: "Pick and roll mal executado",
      },
    ],
    notes: [
      {
        date: "2024-03-18",
        text: "Melhorar finalização com mão esquerda",
        priority: "Alta",
      },
      {
        date: "2024-03-10",
        text: "Trabalhar passes de transição mais seguros",
        priority: "Média",
      },
      {
        date: "2024-03-05",
        text: "Excelente liderança no último jogo",
        priority: "Baixa",
      },
    ],
    advice: [
      "Focar em drives para o lado esquerdo - defensores estão fechando a direita",
      "Reduzir passes arriscados no último quarto",
      "Aumentar intensidade defensiva nos 2 últimos minutos",
    ],
    attendanceHistory: [
      { month: "Jan", present: 11, absent: 1 },
      { month: "Fev", present: 10, absent: 2 },
      { month: "Mar", present: 12, absent: 0 },
    ],
  },
  {
    id: 2,
    name: "Pedro Santos",
    position: "Ala-Armador",
    number: 23,
    avatar: "PS",
    age: 22,
    height: "1.91m",
    weight: "85kg",
    description:
      "Jogador versátil e explosivo, capaz de pontuar de diversas formas. Destaque ofensivo do time com habilidade de criar jogadas próprias e finalizar em transição.",
    stats: {
      points: 22.3,
      assists: 4.5,
      rebounds: 5.8,
      steals: 1.2,
      blocks: 0.5,
      freeThrow: 78,
      threePoint: 35,
      fieldGoal: 45,
    },
    health: {
      status: "Saudável",
      lastCheckup: "2024-03-10",
      notes: "Leve fadiga muscular",
      weight: 85,
      heartRate: 58,
      bodyFat: 10,
    },
    attendance: 88,
    gamesPlayed: 20,
    training: {
      kmPerSession: [6.1, 5.8, 6.3, 5.9, 6.0, 5.7, 6.2, 5.5],
      avgKm: 5.9,
      sessionsThisMonth: 10,
      totalSessions: 42,
    },
    financial: {
      totalPaid: 5400,
      pendingAmount: 0,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "08/01/2024" },
        { month: "Fev", amount: 450, status: "Pago", date: "07/02/2024" },
        { month: "Mar", amount: 450, status: "Pago", date: "05/03/2024" },
      ],
    },
    errors: [
      {
        type: "Arremessos forçados",
        count: 18,
        description: "Tentativas contestadas de 3 pontos",
      },
      { type: "Turnover", count: 15, description: "Dribles excessivos" },
      {
        type: "Faltas defensivas",
        count: 10,
        description: "Posicionamento atrasado",
      },
    ],
    notes: [
      {
        date: "2024-03-20",
        text: "Trabalhar seleção de arremessos",
        priority: "Alta",
      },
      {
        date: "2024-03-15",
        text: "Melhorar comunicação defensiva",
        priority: "Média",
      },
      {
        date: "2024-03-08",
        text: "Ótima performance no último jogo - 28pts",
        priority: "Baixa",
      },
    ],
    advice: [
      "Reduzir isolamentos no perímetro - buscar mais pick and roll",
      "Melhorar posicionamento defensivo no lado fraco",
      "Aproveitar mais os cortes para a cesta",
    ],
    attendanceHistory: [
      { month: "Jan", present: 10, absent: 2 },
      { month: "Fev", present: 9, absent: 3 },
      { month: "Mar", present: 11, absent: 1 },
    ],
  },
  {
    id: 3,
    name: "Gabriel Costa",
    position: "Ala",
    number: 11,
    avatar: "GC",
    age: 21,
    height: "1.96m",
    weight: "88kg",
    description:
      "Ala com forte presença nos dois lados da quadra. Especialista em defesa e rebotes ofensivos, com potencial para melhorar o arremesso de 3 pontos.",
    stats: {
      points: 15.7,
      assists: 2.8,
      rebounds: 6.4,
      steals: 0.9,
      blocks: 1.1,
      freeThrow: 72,
      threePoint: 31,
      fieldGoal: 43,
    },
    health: {
      status: "Lesionado",
      lastCheckup: "2024-03-18",
      notes: "Entorse no tornozelo - 2 semanas",
      weight: 88,
      heartRate: 65,
      bodyFat: 11,
    },
    attendance: 72,
    gamesPlayed: 16,
    training: {
      kmPerSession: [4.5, 4.8, 4.2, 0, 0, 4.6, 4.3, 0],
      avgKm: 4.5,
      sessionsThisMonth: 6,
      totalSessions: 35,
    },
    financial: {
      totalPaid: 4500,
      pendingAmount: 450,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "10/01/2024" },
        { month: "Fev", amount: 450, status: "Pago", date: "12/02/2024" },
        { month: "Mar", amount: 450, status: "Pendente", date: "-" },
      ],
    },
    errors: [
      {
        type: "Arremessos de 3",
        count: 22,
        description: "Baixa porcentagem de longa distância",
      },
      {
        type: "Posicionamento",
        count: 8,
        description: "Rotações defensivas lentas",
      },
      {
        type: "Lances livres",
        count: 12,
        description: "Inconsistência na linha",
      },
    ],
    notes: [
      {
        date: "2024-03-18",
        text: "Foco na recuperação do tornozelo",
        priority: "Alta",
      },
      {
        date: "2024-03-12",
        text: "Treino de arremesso após recuperação",
        priority: "Média",
      },
      {
        date: "2024-03-01",
        text: "Excelente jogo defensivo contra Bulls",
        priority: "Baixa",
      },
    ],
    advice: [
      "Após recuperação, focar em fortalecimento do tornozelo",
      "Trabalhar mecânica de arremesso de 3 pontos",
      "Aumentar agressividade em rebotes ofensivos",
    ],
    attendanceHistory: [
      { month: "Jan", present: 9, absent: 3 },
      { month: "Fev", present: 8, absent: 4 },
      { month: "Mar", present: 6, absent: 6 },
    ],
  },
  {
    id: 4,
    name: "Rafael Oliveira",
    position: "Ala-Pivô",
    number: 32,
    avatar: "RO",
    age: 26,
    height: "2.01m",
    weight: "95kg",
    description:
      "Ala-pivô completo com excelente jogo de poste e capacidade de espaçar a quadra. Líder em rebotes defensivos e proteção de aro.",
    stats: {
      points: 12.1,
      assists: 1.9,
      rebounds: 8.7,
      steals: 0.6,
      blocks: 1.8,
      freeThrow: 68,
      threePoint: 33,
      fieldGoal: 52,
    },
    health: {
      status: "Saudável",
      lastCheckup: "2024-03-12",
      notes: "Recuperado da lesão no joelho",
      weight: 95,
      heartRate: 60,
      bodyFat: 13,
    },
    attendance: 91,
    gamesPlayed: 21,
    training: {
      kmPerSession: [4.2, 4.5, 4.1, 4.3, 4.6, 4.0, 4.4, 4.2],
      avgKm: 4.3,
      sessionsThisMonth: 11,
      totalSessions: 45,
    },
    financial: {
      totalPaid: 5400,
      pendingAmount: 0,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "03/01/2024" },
        { month: "Fev", amount: 450, status: "Pago", date: "01/02/2024" },
        { month: "Mar", amount: 450, status: "Pago", date: "01/03/2024" },
      ],
    },
    errors: [
      {
        type: "Lances livres",
        count: 15,
        description: "Abaixo de 70% na temporada",
      },
      {
        type: "Turnovers no poste",
        count: 9,
        description: "Decisões ruins em double team",
      },
      {
        type: "Help defense",
        count: 6,
        description: "Chegando tarde na ajuda",
      },
    ],
    notes: [
      {
        date: "2024-03-15",
        text: "Continuar fortalecimento do joelho",
        priority: "Alta",
      },
      {
        date: "2024-03-10",
        text: "Trabalhar movimentação sem bola",
        priority: "Média",
      },
      {
        date: "2024-03-05",
        text: "Double-double no último jogo",
        priority: "Baixa",
      },
    ],
    advice: [
      "Praticar lances livres diariamente - meta: 75%",
      "Melhorar passes do poste quando dobrado",
      "Trabalhar footwork ofensivo no garrafão",
    ],
    attendanceHistory: [
      { month: "Jan", present: 11, absent: 1 },
      { month: "Fev", present: 10, absent: 2 },
      { month: "Mar", present: 11, absent: 1 },
    ],
  },
  {
    id: 5,
    name: "Matheus Almeida",
    position: "Pivô",
    number: 44,
    avatar: "MA",
    age: 25,
    height: "2.08m",
    weight: "105kg",
    description:
      "Pivô dominante no garrafão com presença intimidadora. Especialista em proteção de aro e finalizações próximas à cesta.",
    stats: {
      points: 14.8,
      assists: 1.2,
      rebounds: 11.3,
      steals: 0.4,
      blocks: 2.5,
      freeThrow: 62,
      threePoint: 0,
      fieldGoal: 58,
    },
    health: {
      status: "Em observação",
      lastCheckup: "2024-03-20",
      notes: "Dor no ombro - monitorando",
      weight: 105,
      heartRate: 64,
      bodyFat: 15,
    },
    attendance: 85,
    gamesPlayed: 19,
    training: {
      kmPerSession: [3.8, 4.0, 3.5, 3.9, 4.1, 3.7, 3.6, 3.8],
      avgKm: 3.8,
      sessionsThisMonth: 10,
      totalSessions: 40,
    },
    financial: {
      totalPaid: 4950,
      pendingAmount: 450,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "15/01/2024" },
        { month: "Fev", amount: 450, status: "Atrasado", date: "25/02/2024" },
        { month: "Mar", amount: 450, status: "Pendente", date: "-" },
      ],
    },
    errors: [
      {
        type: "Lances livres",
        count: 25,
        description: "Hack-a-strategy vulnerável",
      },
      { type: "Faltas", count: 18, description: "Média de 4 faltas por jogo" },
      {
        type: "Mobilidade lateral",
        count: 14,
        description: "Dificuldade contra pick and pop",
      },
    ],
    notes: [
      {
        date: "2024-03-20",
        text: "Avaliar ombro com fisioterapeuta",
        priority: "Alta",
      },
      {
        date: "2024-03-15",
        text: "Reduzir carga de treino até recuperação",
        priority: "Alta",
      },
      {
        date: "2024-03-08",
        text: "5 tocos no jogo contra Nets",
        priority: "Baixa",
      },
    ],
    advice: [
      "Priorizar recuperação do ombro antes de aumentar intensidade",
      "Trabalhar lances livres com técnica revisada",
      "Melhorar condicionamento para evitar faltas no final dos jogos",
    ],
    attendanceHistory: [
      { month: "Jan", present: 10, absent: 2 },
      { month: "Fev", present: 9, absent: 3 },
      { month: "Mar", present: 10, absent: 2 },
    ],
  },
  {
    id: 6,
    name: "Bruno Ferreira",
    position: "Armador",
    number: 3,
    avatar: "BF",
    age: 20,
    height: "1.78m",
    weight: "72kg",
    description:
      "Jovem armador com excelente visão de jogo e velocidade. Especialista em roubos de bola e transições rápidas. Futuro promissor.",
    stats: {
      points: 11.2,
      assists: 5.8,
      rebounds: 2.4,
      steals: 2.1,
      blocks: 0.1,
      freeThrow: 82,
      threePoint: 36,
      fieldGoal: 44,
    },
    health: {
      status: "Saudável",
      lastCheckup: "2024-03-14",
      notes: "Boa forma física",
      weight: 72,
      heartRate: 56,
      bodyFat: 9,
    },
    attendance: 98,
    gamesPlayed: 23,
    training: {
      kmPerSession: [5.8, 6.0, 5.5, 5.9, 6.2, 5.7, 6.1, 5.8],
      avgKm: 5.9,
      sessionsThisMonth: 12,
      totalSessions: 50,
    },
    financial: {
      totalPaid: 5400,
      pendingAmount: 0,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "02/01/2024" },
        { month: "Fev", amount: 450, status: "Pago", date: "01/02/2024" },
        { month: "Mar", amount: 450, status: "Pago", date: "01/03/2024" },
      ],
    },
    errors: [
      {
        type: "Arremessos prematuros",
        count: 10,
        description: "Decisões rápidas demais",
      },
      {
        type: "Turnovers",
        count: 14,
        description: "Tentativas de passes difíceis",
      },
      {
        type: "Marcação de pivôs",
        count: 7,
        description: "Dificuldade física",
      },
    ],
    notes: [
      {
        date: "2024-03-18",
        text: "Trabalhar força e massa muscular",
        priority: "Média",
      },
      {
        date: "2024-03-10",
        text: "Melhorar paciência na condução",
        priority: "Média",
      },
      {
        date: "2024-03-05",
        text: "Excelente dedicação aos treinos",
        priority: "Baixa",
      },
    ],
    advice: [
      "Ganhar massa muscular para suportar contato físico",
      "Reduzir velocidade nas transições - buscar melhores opções",
      "Continuar desenvolvendo arremesso catch and shoot",
    ],
    attendanceHistory: [
      { month: "Jan", present: 12, absent: 0 },
      { month: "Fev", present: 11, absent: 1 },
      { month: "Mar", present: 12, absent: 0 },
    ],
  },
  {
    id: 7,
    name: "Diego Martins",
    position: "Ala",
    number: 15,
    avatar: "DM",
    age: 23,
    height: "1.93m",
    weight: "84kg",
    description:
      "Jogador versátil com sólidos fundamentos defensivos. Boa capacidade de cortar para a cesta e finalizar em drives.",
    stats: {
      points: 9.5,
      assists: 2.1,
      rebounds: 4.2,
      steals: 1.4,
      blocks: 0.7,
      freeThrow: 75,
      threePoint: 32,
      fieldGoal: 46,
    },
    health: {
      status: "Saudável",
      lastCheckup: "2024-03-16",
      notes: "Excelente condicionamento",
      weight: 84,
      heartRate: 58,
      bodyFat: 11,
    },
    attendance: 82,
    gamesPlayed: 18,
    training: {
      kmPerSession: [5.2, 5.0, 4.8, 5.3, 5.1, 4.9, 5.0, 5.2],
      avgKm: 5.1,
      sessionsThisMonth: 9,
      totalSessions: 38,
    },
    financial: {
      totalPaid: 5400,
      pendingAmount: 0,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "05/01/2024" },
        { month: "Fev", amount: 450, status: "Pago", date: "04/02/2024" },
        { month: "Mar", amount: 450, status: "Pago", date: "03/03/2024" },
      ],
    },
    errors: [
      {
        type: "Arremesso de 3",
        count: 16,
        description: "Hesitação nos arremessos abertos",
      },
      {
        type: "Comunicação",
        count: 8,
        description: "Falta de comunicação defensiva",
      },
      { type: "Rebotes", count: 11, description: "Box out inconsistente" },
    ],
    notes: [
      {
        date: "2024-03-15",
        text: "Aumentar confiança no arremesso",
        priority: "Alta",
      },
      {
        date: "2024-03-08",
        text: "Trabalhar comunicação em quadra",
        priority: "Média",
      },
      {
        date: "2024-03-01",
        text: "Bom jogo defensivo consistente",
        priority: "Baixa",
      },
    ],
    advice: [
      "Arremessar com mais confiança quando aberto",
      "Aumentar volume de voz na comunicação defensiva",
      "Melhorar posicionamento para rebotes defensivos",
    ],
    attendanceHistory: [
      { month: "Jan", present: 10, absent: 2 },
      { month: "Fev", present: 8, absent: 4 },
      { month: "Mar", present: 10, absent: 2 },
    ],
  },
  {
    id: 8,
    name: "Thiago Rocha",
    position: "Pivô",
    number: 55,
    avatar: "TR",
    age: 27,
    height: "2.05m",
    weight: "100kg",
    description:
      "Pivô reserva confiável com bons fundamentos de poste. Contribui com energia e intensidade quando entra em quadra.",
    stats: {
      points: 8.3,
      assists: 0.8,
      rebounds: 7.5,
      steals: 0.3,
      blocks: 1.9,
      freeThrow: 65,
      threePoint: 0,
      fieldGoal: 55,
    },
    health: {
      status: "Saudável",
      lastCheckup: "2024-03-11",
      notes: "Sem restrições",
      weight: 100,
      heartRate: 62,
      bodyFat: 14,
    },
    attendance: 79,
    gamesPlayed: 17,
    training: {
      kmPerSession: [3.5, 3.8, 3.6, 3.9, 3.4, 3.7, 3.5, 3.8],
      avgKm: 3.7,
      sessionsThisMonth: 8,
      totalSessions: 36,
    },
    financial: {
      totalPaid: 4950,
      pendingAmount: 450,
      paymentHistory: [
        { month: "Jan", amount: 450, status: "Pago", date: "12/01/2024" },
        { month: "Fev", amount: 450, status: "Pago", date: "10/02/2024" },
        { month: "Mar", amount: 450, status: "Pendente", date: "-" },
      ],
    },
    errors: [
      { type: "Turnovers", count: 8, description: "Passes ruins do poste" },
      { type: "Lances livres", count: 12, description: "Abaixo de 70%" },
      {
        type: "Condicionamento",
        count: 6,
        description: "Cansaço no 4º período",
      },
    ],
    notes: [
      {
        date: "2024-03-12",
        text: "Aumentar presença nos treinos",
        priority: "Alta",
      },
      {
        date: "2024-03-05",
        text: "Trabalhar condicionamento físico",
        priority: "Alta",
      },
      {
        date: "2024-02-28",
        text: "Boa energia no banco de reservas",
        priority: "Baixa",
      },
    ],
    advice: [
      "Melhorar frequência nos treinos para ganhar condicionamento",
      "Trabalhar movimentação sem bola para facilitar passes",
      "Focar em lances livres durante aquecimentos",
    ],
    attendanceHistory: [
      { month: "Jan", present: 9, absent: 3 },
      { month: "Fev", present: 8, absent: 4 },
      { month: "Mar", present: 8, absent: 4 },
    ],
  },
];

// Dados de presença por mês
export const attendanceByMonth = [
  { month: "Jan", presentes: 85, ausentes: 15 },
  { month: "Fev", presentes: 88, ausentes: 12 },
  { month: "Mar", presentes: 92, ausentes: 8 },
  { month: "Abr", presentes: 78, ausentes: 22 },
  { month: "Mai", presentes: 90, ausentes: 10 },
  { month: "Jun", presentes: 87, ausentes: 13 },
];

// Dados financeiros
export const financialData = {
  totalReceived: 45780,
  totalPending: 8420,
  members: [
    {
      id: 1,
      name: "Lucas Silva",
      contribution: 450,
      status: "Pago",
      month: "Março",
    },
    {
      id: 2,
      name: "Pedro Santos",
      contribution: 450,
      status: "Pago",
      month: "Março",
    },
    {
      id: 3,
      name: "Gabriel Costa",
      contribution: 450,
      status: "Pendente",
      month: "Março",
    },
    {
      id: 4,
      name: "Rafael Oliveira",
      contribution: 450,
      status: "Pago",
      month: "Março",
    },
    {
      id: 5,
      name: "Matheus Almeida",
      contribution: 450,
      status: "Atrasado",
      month: "Fevereiro",
    },
    {
      id: 6,
      name: "Bruno Ferreira",
      contribution: 450,
      status: "Pago",
      month: "Março",
    },
    {
      id: 7,
      name: "Diego Martins",
      contribution: 450,
      status: "Pago",
      month: "Março",
    },
    {
      id: 8,
      name: "Thiago Rocha",
      contribution: 450,
      status: "Pendente",
      month: "Março",
    },
  ],
  monthlyHistory: [
    { month: "Jan", received: 7200, pending: 1800 },
    { month: "Fev", received: 7650, pending: 1350 },
    { month: "Mar", received: 6750, pending: 2250 },
    { month: "Abr", received: 8100, pending: 900 },
    { month: "Mai", received: 7920, pending: 1080 },
    { month: "Jun", received: 8160, pending: 840 },
  ],
};

// Vídeos e jogadas
export const videos = [
  {
    id: 1,
    title: "Jogada Ofensiva - Pick and Roll",
    description:
      "Execução perfeita do pick and roll com finalização no garrafão",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg",
    category: "Ofensiva",
    date: "2024-03-15",
  },
  {
    id: 2,
    title: "Defesa Zona 2-3",
    description:
      "Posicionamento defensivo em zona 2-3 contra ataque adversário",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg",
    category: "Defensiva",
    date: "2024-03-12",
  },
  {
    id: 3,
    title: "Contra-ataque Rápido",
    description:
      "Transição rápida após rebote defensivo com finalização em bandeja",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg",
    category: "Transição",
    date: "2024-03-10",
  },
  {
    id: 4,
    title: "Movimentação sem Bola",
    description: "Cortes e movimentação para criar espaços na defesa",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg",
    category: "Ofensiva",
    date: "2024-03-08",
  },
  {
    id: 5,
    title: "Marcação Individual",
    description: "Técnicas de marcação individual e contenção de drives",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg",
    category: "Defensiva",
    date: "2024-03-05",
  },
  {
    id: 6,
    title: "Lance Livre - Técnica",
    description: "Rotina e mecânica correta para lances livres",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg",
    category: "Fundamentos",
    date: "2024-03-01",
  },
];

// Próximos jogos
export const upcomingGames = [
  { date: "25/03", opponent: "Lakers FC", location: "Casa", time: "19:00" },
  { date: "28/03", opponent: "Bulls Academy", location: "Fora", time: "20:30" },
  { date: "02/04", opponent: "Celtics Jr", location: "Casa", time: "18:00" },
];

// Últimos resultados
export const recentResults = [
  { opponent: "Heat Club", result: "V", score: "78-65", date: "18/03" },
  { opponent: "Spurs Team", result: "D", score: "70-75", date: "15/03" },
  { opponent: "Nets Academy", result: "V", score: "82-71", date: "12/03" },
];
