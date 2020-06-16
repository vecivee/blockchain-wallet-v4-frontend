import { Icon, Text } from 'blockchain-info-components'
import React from 'react'

import { Child, Row, SmallHeader, Wrapper } from '../components'
import { FormattedMessage } from 'react-intl'

const Explorer: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Icon
        name='list'
        size='24px'
        color='purple400'
        style={{ marginRight: '20px' }}
      />
      <Child>
        <SmallHeader>
          <Text size='16px' color='purple400' weight={600}>
            Explorer
          </Text>
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
  )
}

type Props = {}

export default Explorer
