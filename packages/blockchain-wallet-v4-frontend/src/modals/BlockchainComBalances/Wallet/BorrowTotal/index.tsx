import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { Text } from 'blockchain-info-components'
import React, { PureComponent } from 'react'

import { actions } from 'data'
import { BalanceLoader } from '../../components'
import { fiatToString } from 'core/exchange/currency'
import { FiatType, RemoteDataType } from 'core/types'
import { getData } from './selectors'
import { Remote } from 'core'
import { RootState } from 'data/rootReducer'

class BorrowTotal extends PureComponent<Props> {
  componentDidMount () {
    if (!Remote.Success.is(this.props.data)) {
      this.props.borrowActions.fetchUserBorrowHistory()
    }
  }

  render () {
    return this.props.data.cata({
      Success: val => (
        <Text size='14px' color='white' weight={600}>
          {fiatToString({ value: val.balance, unit: val.walletCurrency })}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  borrowActions: bindActionCreators(actions.components.borrow, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type OwnProps = {}
export type SuccessStateType = {
  balance: number
  walletCurrency: FiatType
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}
type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(BorrowTotal)
