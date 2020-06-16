import { Icon, Text } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import BorrowTotal from './BorrowTotal'
import InterestTotal from './InterestTotal'
import WalletTotal from './WalletTotal'

const Wrapper = styled.div`
  display: flex;
`
const Header = styled.div`
  margin-bottom: 16px;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
const Child = styled.div`
  width: 100%;
  padding: 0px 24px 20px 0px;
  border-bottom: 1px solid ${props => props.theme.whiteFade100};
`

const Wallet: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Icon
        name='wallet-filled'
        size='24px'
        color='blue400'
        style={{ marginRight: '20px' }}
      />
      <Child>
        <Header>
          <Text size='20px' color='blue400' weight={600}>
            Blockchain Wallet
          </Text>
        </Header>
        <Row>
          <div>
            <Text
              size='12px'
              color='grey400'
              weight={500}
              style={{ marginBottom: '4px' }}
            >
              <FormattedMessage
                id='scenes.wallet.menutop.balance.totalbalance'
                defaultMessage='Total Balance'
              />
            </Text>
            <WalletTotal />
          </div>
          <div>
            <Text
              size='12px'
              color='grey400'
              weight={500}
              style={{ marginBottom: '4px' }}
            >
              <FormattedMessage
                id='copy.interest.earned'
                defaultMessage='Interest Earned'
              />
            </Text>
            <InterestTotal />
          </div>
          <div>
            <Text
              size='12px'
              color='grey400'
              weight={500}
              style={{ marginBottom: '4px' }}
            >
              <FormattedMessage id='copy.borrowed' defaultMessage='Borrowed' />
            </Text>
            <BorrowTotal />
          </div>
          <div />
        </Row>
      </Child>
    </Wrapper>
  )
}

type Props = {}

export default Wallet
