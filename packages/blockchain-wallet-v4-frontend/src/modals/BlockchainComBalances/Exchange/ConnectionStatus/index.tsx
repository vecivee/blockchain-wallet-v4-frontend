import { actions } from 'data'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { getData } from './selectors'
import { RemoteDataType } from 'core/types'
import { RootState } from 'data/rootReducer'
import React, { PureComponent } from 'react'

import { Button, Text } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'
import { StatusWrapper } from '../../components'

class ConnectionStatus extends PureComponent<Props, State> {
  state = {}

  render () {
    return this.props.data.cata({
      Success: val => {
        switch (true) {
          case !val.isExchangeAccountLinked:
            return (
              <StatusWrapper>
                <Text color='white' size='14px' weight={600}>
                  <FormattedMessage
                    id='copy.wallet.connect_to_exchange'
                    defaultMessage='Connect Your Wallet to the Exchange'
                  />
                </Text>
                <Text
                  color='grey400'
                  size='12px'
                  weight={500}
                  style={{ marginTop: '8px' }}
                >
                  <FormattedMessage
                    id='copy.wallet.connect_to_exchange.keep_priv'
                    defaultMessage='Easily connect your Wallet to the Exchange and send crypto back and forth. All while keeping control of your private keys.'
                  />
                </Text>
                <Button
                  nature='teal'
                  data-e2e='connectNowButton'
                  style={{ marginTop: '8px' }}
                  onClick={event => {
                    this.props.modalActions.showModal('LinkToExchangeAccount', {
                      origin: 'BalancesFlyout'
                    })
                    event.preventDefault()
                    event.stopPropagation()
                    event.native.stopImmediatePropagation()
                  }}
                >
                  <FormattedMessage
                    id='scenes.exchange.connectnow'
                    defaultMessage='Connect Now'
                  />
                </Button>
              </StatusWrapper>
            )
          default:
            return null
        }
      },
      Failure: () => null,
      Loading: () => null,
      NotAsked: () => null
    })
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type OwnProps = {}
type SuccessStateType = {
  isExchangeAccountLinked: boolean
  isExchangeRelinkRequired: boolean
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}
type Props = OwnProps & ConnectedProps<typeof connector>
type State = {}

export default connector(ConnectionStatus)
