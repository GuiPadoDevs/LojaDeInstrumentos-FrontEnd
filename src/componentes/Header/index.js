import Logo from '../Logo'
import OpcoesHeader from '../OpcoesHeader'
import IconsHeader from '../IconsHeader'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    justify-content: center;
`

function Header() {
    return(
        <HeaderContainer>
            <Link to="/">
               <Logo/>
           </Link>
            <OpcoesHeader/>
            <IconsHeader/>
        </HeaderContainer>
    )
}

export default Header