import { connect, ConnectedProps } from 'react-redux'
import React, { PureComponent } from 'react'

import { BalanceLoader } from '../../components'
import { fiatToString } from 'core/exchange/currency'
import { FiatType, RemoteDataType } from 'core/types'
import { getData } from './selectors'
import { RootState } from 'data/rootReducer'
import { Text } from 'blockchain-info-components'

class Wallet extends PureComponent<Props> {
  render () {
    return this.props.data.cata({
      Success: val => (
        <Text size='14px' color='white' weight={600}>
          {fiatToString({ value: val.balance, unit: val.walletCurrency })}
        </Text>
      ),
      Failure: () => (
        <Text size='14px' color='red600'>
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
  balance: number
  walletCurrency: FiatType
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}
type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(Wallet)
