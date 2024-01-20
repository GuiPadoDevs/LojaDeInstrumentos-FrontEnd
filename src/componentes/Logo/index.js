import logo from '../../imagens/instruments_logo.svg'

import styled from 'styled-components'

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
`

const LogoImage = styled.img `
    margin-right: 10px;
`

function Logo () {
    return(
        <LogoContainer>
            <LogoImage
                src={logo}
                alt='logo'
                className='logo-img'
            />
            <p><strong>Loja</strong> de instrumentos</p>
        </LogoContainer>
    )
}

export default Logo