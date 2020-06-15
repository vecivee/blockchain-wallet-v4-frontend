import React from 'react'
import styled from 'styled-components'

import { Navbar, NavbarDivider, NavbarNav } from 'components/Navbar'
import Balances from '../MenuLeft/Balances'
import Features from './Features'
import Refresh from './Refresh'
import SecurityCenter from './SecurityCenter'
import Settings from './Settings'

import { Props as OwnProps } from '.'
import Brand from './Brand'

type Props = {
  handleToggle: () => void
} & OwnProps

const Spacer = styled.div``

const NavbarContainer = styled.div`
  width: auto;
  padding: 0 16px;
  background-color: ${props => props.theme.grey900};
`

const NavbarBottomStyled = styled(Navbar)`
  display: flex;
  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.whiteFade100};
`

const Medium: React.FC<Props> = props => {
  return (
    <NavbarContainer>
      <Navbar>
        <Brand {...props} />
        <Spacer />
        <NavbarNav>
          <SecurityCenter />
          <NavbarDivider />
          <Refresh />
          <NavbarDivider />
          <Settings {...props} />
        </NavbarNav>
      </Navbar>
      <NavbarBottomStyled height='60px'>
        <Balances />
        <NavbarNav>
          <Features />
        </NavbarNav>
      </NavbarBottomStyled>
    </NavbarContainer>
  )
}

export default Medium
