import { Image } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

import { NavbarBrand, NavbarHeader } from 'components/Navbar'
import { Props } from '..'

const BlockchainLogoImage = styled(Image)`
  display: block;
  height: 20px;
  margin-left: 0;
`

const Brand = (props: Props) => {
  return (
    <NavbarHeader
      onClick={() =>
        props.modalActions.showModal('BlockchainComBalances', {
          origin: 'Header'
        })
      }
      role='button'
      style={{ cursor: 'pointer' }}
    >
      <NavbarBrand>
        <BlockchainLogoImage name='blockchain-logo' />
      </NavbarBrand>
    </NavbarHeader>
  )
}

export default Brand
