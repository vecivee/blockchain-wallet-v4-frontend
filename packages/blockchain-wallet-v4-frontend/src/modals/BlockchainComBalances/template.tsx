import React from 'react'
import styled from 'styled-components'

import { FlyoutWrapper } from 'components/Flyout'
import { Icon, Image } from 'blockchain-info-components'

import { Props as OwnProps } from '.'
import Wallet from './Wallet'

const Wrapper = styled.div`
  height: 100%;
  background-color: ${props => props.theme.grey900};
`

export const CustomFlyoutWrapper = styled(FlyoutWrapper)`
  padding: 20px 0px 20px 24px;
  &:not(:first-child) {
    border-top: 1px solid ${props => props.theme.whiteFade100};
  }
`
const BlockchainLogoImage = styled(Image)`
  display: block;
  height: 20px;
  margin-left: 0;
`
const Top = styled.div`
  display: flex;
  padding-right: 20px;
  justify-content: space-between;
`

const Template = (props: Props) => {
  return (
    <Wrapper>
      <CustomFlyoutWrapper>
        <Top>
          <BlockchainLogoImage name='blockchain-logo' />
          <Icon
            cursor
            data-e2e='closeBcComBalances'
            name='close'
            size='20px'
            color='grey600'
            role='button'
            onClick={() => props.handleClose()}
          />
        </Top>
      </CustomFlyoutWrapper>
      <CustomFlyoutWrapper>
        <Wallet />
      </CustomFlyoutWrapper>
    </Wrapper>
  )
}

type Props = OwnProps & { handleClose: () => void }

export default Template
