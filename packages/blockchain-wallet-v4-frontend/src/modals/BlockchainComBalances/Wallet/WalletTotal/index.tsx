import { connect, ConnectedProps } from 'react-redux'
import React, { PureComponent } from 'react'

import { BalanceLoader } from '../../components'
import { getData } from './selectors'
import { RemoteDataType } from 'core/types'
import { RootState } from 'data/rootReducer'
import { Text } from 'blockchain-info-components'

class Wallet extends PureComponent<Props> {
  render () {
    return this.props.data.cata({
      Success: val => (
        <Text size='14px' color='white' weight={600}>
          {val.totalBalance.totalBalance}
        </Text>
      ),
      Failure: () => (
        <Text size='14px' color='red600' weight={600}>
          Error.
        </Text>
      ),
      Loading: () => <BalanceLoader />,
      NotAsked: () => <BalanceLoader />
    })
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: getData(state)
})

const connector = connect(mapStateToProps)

type OwnProps = {}
type SuccessStateType = {
  totalBalance: { path: 'string'; totalBalance: 'string' }
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}
type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(Wallet)
