import axios from "axios";

const instrumentosAPI = axios.create({ baseURL: "http://localhost:3001/produtos" });

async function getInstrumentos() {
  const response = await instrumentosAPI.get('/');
  return response.data;
}

async function getInstrumentosPorCategoria(categoria) {
  const response = await instrumentosAPI.get(`/categoria/${categoria}`);
  return response.data;
}

async function criarInstrumento(produto) {
  try {
    const response = await instrumentosAPI.post('/insereProduto', produto);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function atualizarInstrumento(produtoAtualizado) {
  try {
    const response = await instrumentosAPI.put(`/alteraProduto/`, produtoAtualizado);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deletarInstrumento(id) {
  try {
    const response = await instrumentosAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export {
  getInstrumentos,
  getInstrumentosPorCategoria,
  criarInstrumento,
  atualizarInstrumento,
  deletarInstrumento,
};
