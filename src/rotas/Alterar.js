import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import styled from 'styled-components';
import { atualizarInstrumento } from '../servicos/instrumentos';

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

function EditarProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState({
    id: '', 
    nome_produto: '',
    preco: '',
    categoria: '',
    ativo: true,
  });

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        await atualizarInstrumento(produto);
      } catch (error) {
          console.error('Erro ao buscar detalhes do produto:', error.message);
          alert('Erro ao buscar detalhes do produto');
      }
    };

    buscarProduto();
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
        
          if (!produto.id) {
              alert('ID do produto não definido');
              return;
          }
        await atualizarInstrumento(produto);
        alert('Produto atualizado com sucesso');
    } catch (error) {
          console.error('Erro ao atualizar o produto:', error.message);
        alert('Erro ao atualizar o produto');
    }
  };

  return (
    <AppContainer>
      <FormContainer>
        <Titulo>Editar Produto</Titulo>
        <form onSubmit={handleSubmit}>
        <div>
            <FormLabel>ID:</FormLabel>
            <FormInput
              type="text"
              name="id"
              value={produto.id}
              onChange={handleChange}
            />
        </div>
        <div>
            <FormLabel>Nome do Produto:</FormLabel>
            <FormInput
              type="text"
              name="nome_produto"
              value={produto.nome_produto}
              onChange={handleChange}
            />
          </div>
          <FormButton type="submit">Atualizar Produto</FormButton>
        </form>
      </FormContainer>
    </AppContainer>
  );
}

export default EditarProduto;
