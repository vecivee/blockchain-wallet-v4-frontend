import styled from 'styled-components'

import { Navbar, NavbarDivider, NavbarMenu, NavbarNav } from 'components/Navbar'
import Brand from './Brand'
import Features from './Features'
import React from 'react'
import Refresh from './Refresh'
import SecurityCenter from './SecurityCenter'
import Settings from './Settings'

import { Props as OwnProps } from '.'

type Props = {
  handleToggle: () => void
} & OwnProps

const NavbarStyled = styled(Navbar)`
  background-color: ${props => props.theme.grey900};
`

const Large: React.FC<Props> = props => {
  return (
    <NavbarStyled height='60px'>
      <Brand {...props} />
      <NavbarMenu>
        <NavbarNav>
          <Features />
        </NavbarNav>
        <NavbarNav>
          <SecurityCenter />
          <NavbarDivider />
          <Refresh />
          <NavbarDivider />
          <Settings {...props} />
        </NavbarNav>
      </NavbarMenu>
    </NavbarStyled>
  )
}

export default Large
