// Interface para os dados dos estados
export interface EstadoDados {
    nome: string;
    sigla: string;
    modais: {
      rodoviario: number;
      ferroviario: number;
      aquaviario: number;
      aereo: number;
      dutoviario: number;
    };
    detalhes: {
      kmRodovias: number;
      kmFerrovias: number;
      kmAquavias: number;
      aeroportos: number;
      kmDutos: number;
    };
  }
  
  // Dados dos estados (uma amostra - dados fictícios)
  export const estadosDados: EstadoDados[] = [
    {
      nome: "Acre",
      sigla: "AC",
      modais: {
        rodoviario: 40,
        ferroviario: 5,
        aquaviario: 50,
        aereo: 3,
        dutoviario: 2
      },
      detalhes: {
        kmRodovias: 20000,
        kmFerrovias: 1500,
        kmAquavias: 300,
        aeroportos: 15,
        kmDutos: 200
      }
    },
    {
      nome: "Alagoas",
      sigla: "AL",
      modais: {
        rodoviario: 68,
        ferroviario: 10,
        aquaviario: 15,
        aereo: 5,
        dutoviario: 2
      },
      detalhes: {
        kmRodovias: 25000,
        kmFerrovias: 2000,
        kmAquavias: 350,
        aeroportos: 20,
        kmDutos: 220
      }
    },
    {
      nome: "Amapá",
      sigla: "AP",
      modais: {
        rodoviario: 40,
        ferroviario: 3,
        aquaviario: 55,
        aereo: 1,
        dutoviario: 1
      },
      detalhes: {
        kmRodovias: 15000,
        kmFerrovias: 800,
        kmAquavias: 400,
        aeroportos: 12,
        kmDutos: 150
      }
    },
    {
      nome: "Amazonas",
      sigla: "AM",
      modais: {
        rodoviario: 20,
        ferroviario: 2,
        aquaviario: 75,
        aereo: 2,
        dutoviario: 1
      },
      detalhes: {
        kmRodovias: 30000,
        kmFerrovias: 1200,
        kmAquavias: 500,
        aeroportos: 45,
        kmDutos: 180
      }
    },
    {
      nome: "Bahia",
      sigla: "BA",
      modais: {
        rodoviario: 60,
        ferroviario: 15,
        aquaviario: 20,
        aereo: 3,
        dutoviario: 2
      },
      detalhes: {
        kmRodovias: 40000,
        kmFerrovias: 3000,
        kmAquavias: 600,
        aeroportos: 50,
        kmDutos: 250
      }
    },
    {
      nome: "Ceará",
      sigla: "CE",
      modais: {
        rodoviario: 70,
        ferroviario: 10,
        aquaviario: 15,
        aereo: 3,
        dutoviario: 2
      },
      detalhes: {
        kmRodovias: 35000,
        kmFerrovias: 2500,
        kmAquavias: 450,
        aeroportos: 40,
        kmDutos: 200
      }
    },
    {
      nome: "Distrito Federal",
      sigla: "DF",
      modais: {
        rodoviario: 80,
        ferroviario: 0,
        aquaviario: 0,
        aereo: 15,
        dutoviario: 5
      },
      detalhes: {
        kmRodovias: 50000,
        kmFerrovias: 1000,
        kmAquavias: 0,
        aeroportos: 5,
        kmDutos: 300
      }
    },
    {
      nome: "Espírito Santo",
      sigla: "ES",
      modais: {
        rodoviario: 55,
        ferroviario: 20,
        aquaviario: 20,
        aereo: 3,
        dutoviario: 2
      },
      detalhes: {
        kmRodovias: 45000,
        kmFerrovias: 2200,
        kmAquavias: 400,
        aeroportos: 25,
        kmDutos: 180
      }
    },
    {
      nome: "Goiás",
      sigla: "GO",
      modais: {
        rodoviario: 65,
        ferroviario: 20,
        aquaviario: 5,
        aereo: 5,
        dutoviario: 5
      },
      detalhes: {
        kmRodovias: 55000,
        kmFerrovias: 2800,
        kmAquavias: 350,
        aeroportos: 35,
        kmDutos: 220
      }
    },
    {
      nome: "Maranhão",
      sigla: "MA",
      modais: {
        rodoviario: 50,
        ferroviario: 25,
        aquaviario: 20,
        aereo: 3,
        dutoviario: 2
      },
      detalhes: {
        kmRodovias: 42000,
        kmFerrovias: 2500,
        kmAquavias: 500,
        aeroportos: 20,
        kmDutos: 240
      }
    },
    {
        nome: "Mato Grosso",
        sigla: "MT",
        modais: {
          rodoviario: 60,
          ferroviario: 25,
          aquaviario: 5,
          aereo: 5,
          dutoviario: 5
        },
        detalhes: {
          kmRodovias: 48000,
          kmFerrovias: 3000,
          kmAquavias: 300,
          aeroportos: 30,
          kmDutos: 210
        }
      },
      {
        nome: "Mato Grosso do Sul",
        sigla: "MS",
        modais: {
          rodoviario: 55,
          ferroviario: 30,
          aquaviario: 5,
          aereo: 5,
          dutoviario: 5
        },
        detalhes: {
          kmRodovias: 46000,
          kmFerrovias: 3200,
          kmAquavias: 250,
          aeroportos: 25,
          kmDutos: 200
        }
      },
      {
        nome: "Minas Gerais",
        sigla: "MG",
        modais: {
          rodoviario: 65,
          ferroviario: 20,
          aquaviario: 5,
          aereo: 5,
          dutoviario: 5
        },
        detalhes: {
          kmRodovias: 65000,
          kmFerrovias: 3500,
          kmAquavias: 430,
          aeroportos: 70,
          kmDutos: 230
        }
      },
      {
        nome: "Pará",
        sigla: "PA",
        modais: {
          rodoviario: 30,
          ferroviario: 15,
          aquaviario: 50,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 38000,
          kmFerrovias: 2000,
          kmAquavias: 800,
          aeroportos: 40,
          kmDutos: 220
        }
      },
      {
        nome: "Paraíba",
        sigla: "PB",
        modais: {
          rodoviario: 70,
          ferroviario: 10,
          aquaviario: 15,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 40000,
          kmFerrovias: 2200,
          kmAquavias: 500,
          aeroportos: 22,
          kmDutos: 210
        }
      },
      {
        nome: "Paraná",
        sigla: "PR",
        modais: {
          rodoviario: 60,
          ferroviario: 20,
          aquaviario: 15,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 42000,
          kmFerrovias: 2800,
          kmAquavias: 250,
          aeroportos: 37,
          kmDutos: 200
        }
      },
      {
        nome: "Pernambuco",
        sigla: "PE",
        modais: {
          rodoviario: 60,
          ferroviario: 10,
          aquaviario: 25,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 44000,
          kmFerrovias: 2500,
          kmAquavias: 500,
          aeroportos: 30,
          kmDutos: 210
        }
      },
      {
        nome: "Piauí",
        sigla: "PI",
        modais: {
          rodoviario: 55,
          ferroviario: 15,
          aquaviario: 25,
          aereo: 18,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 41000,
          kmFerrovias: 2400,
          kmAquavias: 480,
          aeroportos: null,
          kmDutos: 205
        }
      },
      {
        nome: "Rio de Janeiro",
        sigla: "RJ",
        modais: {
          rodoviario: 50,
          ferroviario: 15,
          aquaviario: 20,
          aereo: 10,
          dutoviario: 5
        },
        detalhes: {
          kmRodovias: 36000,
          kmFerrovias: 2000,
          kmAquavias: 400,
          aeroportos: 40,
          kmDutos: 180
        }
      },
      {
        nome: "Rio Grande do Norte",
        sigla: "RN",
        modais: {
          rodoviario: 70,
          ferroviario: 10,
          aquaviario: 15,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 39000,
          kmFerrovias: 1800,
          kmAquavias: 420,
          aeroportos: 20,
          kmDutos: 190
        }
      },
      {
        nome: "Rio Grande do Sul",
        sigla: "RS",
        modais: {
          rodoviario: 58,
          ferroviario: 25,
          aquaviario: 12,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 37000,
          kmFerrovias: 2500,
          kmAquavias: 450,
          aeroportos: 50,
          kmDutos: 200
        }
      },
      {
        nome: "Rondônia",
        sigla: "RO",
        modais: {
          rodoviario: 45,
          ferroviario: 15,
          aquaviario: 30,
          aereo: 5,
          dutoviario: 5
        },
        detalhes: {
          kmRodovias: 34000,
          kmFerrovias: 1700,
          kmAquavias: 380,
          aeroportos: 18,
          kmDutos: 170
        }
      },
      {
        nome: "Roraima",
        sigla: "RR",
        modais: {
          rodoviario: 40,
          ferroviario: 10,
          aquaviario: 45,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 35000,
          kmFerrovias: 1500,
          kmAquavias: 360,
          aeroportos: 10,
          kmDutos: 160
        }
      },
      {
        nome: "Santa Catarina",
        sigla: "SC",
        modais: {
          rodoviario: 62,
          ferroviario: 20,
          aquaviario: 13,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 42000,
          kmFerrovias: 2600,
          kmAquavias: 480,
          aeroportos: 35,
          kmDutos: 210
        }
      },
      {
        nome: "São Paulo",
        sigla: "SP",
        modais: {
          rodoviario: 65,
          ferroviario: 15,
          aquaviario: 5,
          aereo: 10,
          dutoviario: 5
        },
        detalhes: {
          kmRodovias: 34650,
          kmFerrovias: 5200,
          kmAquavias: 420,
          aeroportos: 80,
          kmDutos: 240
        }
      },
      {
        nome: "Sergipe",
        sigla: "SE",
        modais: {
          rodoviario: 65,
          ferroviario: 10,
          aquaviario: 20,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 36000,
          kmFerrovias: 2200,
          kmAquavias: 400,
          aeroportos: 15,
          kmDutos: 190
        }
      },
      {
        nome: "Tocantins",
        sigla: "TO",
        modais: {
          rodoviario: 50,
          ferroviario: 20,
          aquaviario: 25,
          aereo: 3,
          dutoviario: 2
        },
        detalhes: {
          kmRodovias: 34000,
          kmFerrovias: 2000,
          kmAquavias: 420,
          aeroportos: 15,
          kmDutos: 200
        }
      }
    
  ];
  
  
  // Lista completa de estados brasileiros
  export interface estadosBrasileiros {
    nome: string;
    sigla: string;
  }
  export const estadosBrasileiros: estadosBrasileiros []  = [
    { nome: "Acre", sigla: "AC" },
    { nome: "Alagoas", sigla: "AL" },
    { nome: "Amapá", sigla: "AP" },
    { nome: "Amazonas", sigla: "AM" },
    { nome: "Bahia", sigla: "BA" },
    { nome: "Ceará", sigla: "CE" },
    { nome: "Distrito Federal", sigla: "DF" },
    { nome: "Espírito Santo", sigla: "ES" },
    { nome: "Goiás", sigla: "GO" },
    { nome: "Maranhão", sigla: "MA" },
    { nome: "Mato Grosso", sigla: "MT" },
    { nome: "Mato Grosso do Sul", sigla: "MS" },
    { nome: "Minas Gerais", sigla: "MG" },
    { nome: "Pará", sigla: "PA" },
    { nome: "Paraíba", sigla: "PB" },
    { nome: "Paraná", sigla: "PR" },
    { nome: "Pernambuco", sigla: "PE" },
    { nome: "Piauí", sigla: "PI" },
    { nome: "Rio de Janeiro", sigla: "RJ" },
    { nome: "Rio Grande do Norte", sigla: "RN" },
    { nome: "Rio Grande do Sul", sigla: "RS" },
    { nome: "Rondônia", sigla: "RO" },
    { nome: "Roraima", sigla: "RR" },
    { nome: "Santa Catarina", sigla: "SC" },
    { nome: "São Paulo", sigla: "SP" },
    { nome: "Sergipe", sigla: "SE" },
    { nome: "Tocantins", sigla: "TO" }
  ];
  