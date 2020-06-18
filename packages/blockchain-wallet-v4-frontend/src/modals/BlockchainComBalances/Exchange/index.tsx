import { Text } from 'blockchain-info-components'
import React from 'react'

import { BalanceIcon, Child, Header, Row, Wrapper } from '../components'
// import { FormattedMessage } from 'react-intl'

const Exchange: React.FC<Props> = () => {
  return (
    <Wrapper>
      <BalanceIcon
        name='bolt-with-background'
        size='22px'
        color='teal400'
        style={{ marginRight: '20px' }}
      />
      <Child>
        <Header>
          <Text size='20px' color='teal400' weight={600}>
            Blockchain.com Exchange
          </Text>
        </Header>
        <Row>
          <div />
        </Row>
      </Child>
    </Wrapper>
  )
}

type Props = {}

export default Exchange
