import { Icon, Link, Text } from 'blockchain-info-components'
import React from 'react'

import { BalanceIcon, Child, Row, SmallHeader, Wrapper } from '../components'
import { FormattedMessage } from 'react-intl'

const Explorer: React.FC<Props> = () => {
  return (
    <Link
      href='https://support.blockchain.com'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Wrapper className='link'>
        <BalanceIcon
          name='learning'
          size='16px'
          color='orange400'
          style={{ marginRight: '20px' }}
        />
        <Child>
          <SmallHeader>
            <Text size='16px' color='orange400' weight={600}>
              <FormattedMessage
                id='scenes.exchange.menutop.need_help'
                defaultMessage='Need Help?'
              />
            </Text>
            <Icon name='external-link' color='grey400' role='button' />
          </SmallHeader>
          <Row>
            <div>
              <Text color='whiteFade400' size='14px' weight={500}>
                <FormattedMessage
                  id='copy.learn_more.contact_support'
                  defaultMessage='Visit our learning area or contact support with our chat widget on the right hand side.'
                />
              </Text>
            </div>
          </Row>
        </Child>
      </Wrapper>
    </Link>
  )
}

type Props = {}

export default Explorer
