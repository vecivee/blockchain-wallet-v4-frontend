import { compose } from 'redux'
import React, { PureComponent } from 'react'

import modalEnhancer from 'providers/ModalEnhancer'

import { ModalPropsType } from '../types'
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

type OwnProps = ModalPropsType
export type Props = OwnProps
type State = { show: boolean }

const enhance = compose(
  modalEnhancer('BlockchainComBalances', { transition: duration })
)

export default enhance(BlockchainComBalances)
