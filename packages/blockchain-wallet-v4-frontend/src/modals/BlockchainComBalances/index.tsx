import { compose /*, Dispatch */ } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import React, { PureComponent } from 'react'

import { RootState } from 'data/rootReducer'
import modalEnhancer from 'providers/ModalEnhancer'

import { getData } from './selectors'
import { ModalPropsType } from '../types'
import { RemoteDataType } from 'core/types'
import Flyout, { duration, FlyoutChild, FlyoutWrapper } from 'components/Flyout'

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
        data-e2e='blockchainComBalancesModal'
        direction='left'
        in={this.state.show}
        onClose={this.handleClose}
        windowLocation='left'
        {...this.props}
      >
        <FlyoutChild>
          <FlyoutWrapper>
            {JSON.stringify(this.props.data['@@values'])}
          </FlyoutWrapper>
        </FlyoutChild>
      </Flyout>
    )
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: getData(state)
})

const mapDispatchToProps = (/* dispatch: Dispatch */) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps)

type OwnProps = ModalPropsType
type SuccessStateType = {
  totalBalance: number
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}
type Props = OwnProps & ConnectedProps<typeof connector>
type State = {}

const enhance = compose(modalEnhancer('BlockchainComBalances'), connector)

export default enhance(BlockchainComBalances)
