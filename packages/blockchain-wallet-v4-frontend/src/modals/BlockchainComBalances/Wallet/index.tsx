import { Text } from 'blockchain-info-components'
import React from 'react'

import { BalanceIcon, Child, Header, Row, Wrapper } from '../components'
import { FormattedMessage } from 'react-intl'
import BorrowTotal from './BorrowTotal'
import InterestTotal from './InterestTotal'
import WalletTotal from './WalletTotal'

const Wallet: React.FC<Props> = () => {
  return (
    <Wrapper>
      <BalanceIcon
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
