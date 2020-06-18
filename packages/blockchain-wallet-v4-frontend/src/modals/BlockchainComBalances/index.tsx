import { compose } from 'redux'
import React, { PureComponent } from 'react'

import modalEnhancer from 'providers/ModalEnhancer'

import { connect, ConnectedProps } from 'react-redux'
import { ModalPropsType } from '../types'
import { RootState } from 'data/rootReducer'
import { selectors } from 'data'
import Flyout, { duration, FlyoutChild } from 'components/Flyout'
import Template from './template'

class BlockchainComBalances extends PureComponent<Props, State> {
  state = { show: false }

  componentDidMount () {
    /* eslint-disable */
    this.setState({ show: true })
    /* eslint-enable */
  }

  handleClose = () => {
    this.setState({ show: false })
    setTimeout(() => {
      this.props.close()
    }, duration)
  }

  render () {
    return (
      <Flyout
        {...this.props}
        data-e2e='blockchainComBalancesModal'
        direction='left'
        in={this.state.show}
        onClose={this.handleClose}
        windowLocation='left'
      >
        <FlyoutChild>
          <Template {...this.props} handleClose={this.handleClose} />
        </FlyoutChild>
      </Flyout>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  domains: selectors.core.walletOptions.getDomains(state).getOrElse({
    exchange: 'https://exchange.blockchain.com',
    comRoot: 'https://blockchain.com'
  })
})

const connector = connect(mapStateToProps)

type OwnProps = ModalPropsType
export type Props = OwnProps & ConnectedProps<typeof connector>
type State = { show: boolean }

const enhance = compose(
  modalEnhancer('BlockchainComBalances', { transition: duration }),
  connector
)

export default enhance(BlockchainComBalances)
