import { Icon } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

import {
  Navbar,
  NavbarDivider,
  NavbarNav,
  NavbarNavItem
} from 'components/Navbar'
import { Props as OwnProps } from '.'
import Balances from '../MenuLeft/Balances'
import Brand from './Brand'
import Features from './Features'
import Refresh from './Refresh'
import SecurityCenter from './SecurityCenter'
import Settings from './Settings'

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
  justify-content: space-between;
  border-top: 1px solid ${props => props.theme.whiteFade100};
`

const HamburgerIcon = styled(Icon)`
  margin-right: 16px;
`

const Small: React.FC<Props> = props => {
  return (
    <NavbarContainer>
      <Navbar>
        <Brand {...props} />
        <Spacer />
        <NavbarNav>
          <SecurityCenter />
          <Refresh />
          <Settings {...props} />
        </NavbarNav>
      </Navbar>
      <NavbarBottomStyled height='60px'>
        <NavbarNav>
          <NavbarNavItem>
            <HamburgerIcon
              name='hamburger-menu'
              color='alwaysWhite'
              size='16px'
              onClick={props.handleToggle}
            />
          </NavbarNavItem>
          <NavbarDivider />
          <NavbarNavItem>
            <Balances />
          </NavbarNavItem>
        </NavbarNav>
        <NavbarNav>
          <NavbarNavItem>
            <Features />
          </NavbarNavItem>
        </NavbarNav>
      </NavbarBottomStyled>
    </NavbarContainer>
  )
}

export default Small
