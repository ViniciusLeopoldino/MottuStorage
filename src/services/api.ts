// Define a URL base da sua API.
// Use 'http://10.0.2.2:8080' para o emulador Android.
// Use o IP da sua máquina na rede para um dispositivo físico.
const BASE_URL = 'https://api-dpvtech.onrender.com';


/**
 * Função para fazer uma requisição à API.
 * @param endpoint O endpoint a ser chamado (ex: '/auth/login').
 * @param method O método HTTP (GET, POST, PUT, DELETE).
 * @param body O corpo da requisição (para POST e PUT).
 * @returns A resposta da API em formato JSON ou uma promessa vazia em caso de sucesso sem conteúdo.
 */
async function request(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
  const headers = { 'Content-Type': 'application/json' };
  const config: RequestInit = { method, headers };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    // AJUSTE CRÍTICO: Se a resposta for 204 (No Content), a operação foi um sucesso.
    // Retornamos uma promessa de sucesso vazia, pois não há corpo para ler.
    if (response.status === 204) {
      return Promise.resolve(); 
    }

    // Para todas as outras respostas, tentamos ler o corpo JSON.
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Ocorreu um erro na requisição.');
    }

    return responseData;

  } catch (error) {
    // Se a falha for na leitura do JSON (para respostas 204 na versão antiga),
    // ou qualquer outro erro, ele será capturado e registado aqui.
    console.error(`Erro na requisição para ${endpoint}:`, error);
    throw error;
  }
}

// Exporta funções específicas para cada endpoint
export const api = {
  login: (email: string, senha: string) => request('/auth/login', 'POST', { email, senha }),
  register: (usuario: { nome: string; email: string; senha: string; }) => request('/auth/register', 'POST', usuario),
  
  createVehicle: (veiculo: any) => request('/veiculos', 'POST', veiculo),
  getVehicles: () => request('/veiculos', 'GET'),
  searchVehicle: (query: string) => request(`/veiculos/search?query=${encodeURIComponent(query)}`, 'GET'),
  deleteVehicle: (id: number) => request(`/veiculos/${id}`, 'DELETE'),

  createLocation: (localizacao: any) => request('/localizacoes', 'POST', localizacao),
  searchLocation: (loc: { armazem: string; rua: string; modulo: string; compartimento: string; }) => {
    const params = new URLSearchParams(loc).toString();
    return request(`/localizacoes/search?${params}`, 'GET');
  },
  deleteLocation: (id: number) => request(`/localizacoes/${id}`, 'DELETE'),

  createHistory: (veiculoId: number, localizacaoId: number) => request('/historico', 'POST', { veiculoId, localizacaoId }),
  getHistory: () => request('/historico', 'GET'),
  deleteHistoryItem: (id: number) => request(`/historico/${id}`, 'DELETE'),
  clearHistory: () => request('/historico/all', 'DELETE'),
};
