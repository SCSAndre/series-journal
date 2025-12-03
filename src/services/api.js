import axios from 'axios';

// Cria uma instância do Axios com a URL base da API.
// Permite sobrescrever via variável de ambiente VITE_API_BASE_URL.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const api = axios.create({
  baseURL,
});

export default api;