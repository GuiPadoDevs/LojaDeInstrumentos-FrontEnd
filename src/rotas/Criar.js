import { useState } from 'react';
import styled from 'styled-components';
import { criarInstrumento } from '../servicos/instrumentos';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: -10px auto 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  margin-top: 8px; 
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const FormButton = styled.button`
  background-color: #326589;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px; 
`;

const Titulo = styled.h2`
  color: #002F52;
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
`;

const DropdownContainer = styled.div`
  margin-bottom: 10px;
`;

const Dropdown = styled.div`
  background-color: #326589;
  color: #FFF;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #326589;
  border-radius: 4px;
  z-index: 2;
`;

const Option = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #002F52;
  }
`;

function CriarProduto() {
  const [produto, setProduto] = useState({
    nome_produto: '',
    preco: '',
    categoria: '',
    ativo: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await criarInstrumento(produto);
      alert('Produto criado com sucesso');
    } catch (error) {
      alert('Erro ao criar o produto');
    }
  };

  return (
    <AppContainer>
      <FormContainer>
        <Titulo>Criar Novo Produto</Titulo>
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel>Nome do Produto:</FormLabel>
            <FormInput
              type="text"
              name="nome_produto"
              value={produto.nome_produto}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel>Preço:</FormLabel>
            <FormInput
              type="text"
              name="preco"
              value={produto.preco}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel>Categoria:</FormLabel>
            <select
              name="categoria"
              value={produto.categoria}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="Cordas">Cordas</option>
              <option value="Percussao">Percussão</option>
            </select>
          </div>
          <div>
            <FormLabel>Ativo:</FormLabel>
            <select
              name="ativo"
              value={produto.ativo}
              onChange={handleChange}
            >
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </select>
          </div>
          <FormButton type="submit">Criar Produto</FormButton>
        </form>
      </FormContainer>
    </AppContainer>
  );
}

export default CriarProduto;
