import { Icon, Link, Text } from 'blockchain-info-components'
import React from 'react'

import { BalanceIcon, Child, Row, SmallHeader, Wrapper } from '../components'
import { FormattedMessage } from 'react-intl'

import { Props as OwnProps } from '../'

const Explorer: React.FC<Props> = props => {
  return (
    <Link
      href={`${props.domains.comRoot}/explorer`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Wrapper className='link'>
        <BalanceIcon
          name='list'
          size='14px'
          color='purple400'
          style={{ marginRight: '20px', lineHeight: '20px' }}
        />
        <Child>
          <SmallHeader>
            <Text size='16px' color='purple400' weight={600}>
              Explorer
            </Text>
            <Icon name='external-link' color='grey400' role='button' />
          </SmallHeader>
          <Row>
            <div>
              <Text color='whiteFade400' size='14px' weight={500}>
                <FormattedMessage
                  id='copy.explorer.features'
                  defaultMessage='Explore network stats, charts, prices and more.'
                />
              </Text>
            </div>
          </Row>
        </Child>
      </Wrapper>
    </Link>
  )
}

type Props = OwnProps

export default Explorer
