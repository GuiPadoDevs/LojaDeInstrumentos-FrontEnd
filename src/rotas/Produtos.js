import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { getInstrumentos, deletarInstrumento, getInstrumentosPorCategoria } from '../servicos/instrumentos';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

const ResultadoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
    text-align: center;
    padding: 0 100px;
    p {
        width: 200px;
        color: #FFF;
    }
    img {
        width: 100px;
    }
    &:hover {
        border: 1px solid white;
    }
    button {
        background-color: #FF0000;
        color: #FFF;
        padding: 5px 10px;
        margin-top: 10px;
        border: none;
        cursor: pointer;
    }`

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
    padding-top: 35px
`
const DropdownContainer = styled.div`
  margin-top: 20px;
  position: relative;
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
  top: 100%;
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

function Produtos() {
  const [instrumentos, setInstrumentos] = useState([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function fetchInstrumentos() {
    const instrumentosDaAPI = await getInstrumentos()
    setInstrumentos(instrumentosDaAPI)
  }
  
  async function fetchInstrumentosPorCategoria() {
    const instrumentosDaAPI = await getInstrumentosPorCategoria(categoriaSelecionada);
    setInstrumentos(instrumentosDaAPI);
  }
    
    const handleDelete = async (id) => {
        try {
          // Chama a função para deletar o produto pelo ID
          await deletarInstrumento(id);
          // Atualiza a lista de instrumentos após a remoção bem-sucedida
          const instrumentosAtualizados = await getInstrumentos();
            setInstrumentos(instrumentosAtualizados);
            alert('Instrumento deletado com sucesso!')
        } catch (error) {
          console.error('Erro ao deletar o produto:', error.message);
        }
      };

      useEffect(() => {
        if (categoriaSelecionada === '') {
          fetchInstrumentos();
        } else {
          fetchInstrumentosPorCategoria();
        }
      }, [categoriaSelecionada]);
  
      const handleOptionClick = (categoria) => {
        setCategoriaSelecionada(categoria);
        setDropdownOpen(false);
      };
  
  return (
    <AppContainer>
      <div>
        <Titulo>Aqui estão os instrumentos:</Titulo>
          <DropdownContainer>
            <Dropdown onClick={() => setDropdownOpen(!dropdownOpen)}>
              {categoriaSelecionada || 'Todos'}
            </Dropdown>
            {dropdownOpen && (
              <OptionsContainer>
                <Option onClick={() => handleOptionClick('')}>Todos</Option>
                <Option onClick={() => handleOptionClick('Cordas')}>Cordas</Option>
                <Option onClick={() => handleOptionClick('Percussao')}>Percussão</Option>
              </OptionsContainer>
            )}
          </DropdownContainer>

        <ResultadoContainer>
          {instrumentos.length !== 0 ? (
            instrumentos.map((instrumento) => (
              <Resultado key={instrumento._id}>
                <p>{instrumento._id}</p>
                <p>{instrumento.nome_produto}</p>
                {/* Adiciona um botão de deletar para cada produto */}
                <button onClick={() => handleDelete(instrumento._id)}>Deletar</button>
              </Resultado>
            ))
          ) : (
            <p>Nenhum instrumento encontrado.</p>
          )}
        </ResultadoContainer>
      </div>
    </AppContainer>
  );
 }

export default Produtos