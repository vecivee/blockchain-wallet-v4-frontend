import { connect, ConnectedProps } from 'react-redux'
import { Image, Link, Text, TextGroup } from 'blockchain-info-components'
import React, { PureComponent } from 'react'

import { RemoteDataType } from 'core/types'
import { RootState } from 'data/rootReducer'
import { UserDataType } from 'data/types'

import { actions } from 'data'
import { bindActionCreators, Dispatch } from 'redux'
import { FormattedMessage } from 'react-intl'
import { getData } from './selectors'
import { StatusWrapper } from '../../components'

class WalletKycStatus extends PureComponent<Props, State> {
  state = {}

  render () {
    return this.props.data.cata({
      Success: val => {
        switch (val.userData.tiers.current) {
          case 0:
            return (
              <StatusWrapper>
                <Text color='white' size='14px' weight={600}>
                  <FormattedMessage
                    id='copy.wallet.get_started'
                    defaultMessage='Get Started with Your Wallet'
                  />
                </Text>
                <TextGroup inline style={{ marginTop: '8px', lineHeight: '1' }}>
                  <Text color='grey400' size='12px' weight={500}>
                    <FormattedMessage
                      id='copy.identity_verification.buy_swap'
                      defaultMessage='Verify your identity to start buying and swapping crypto.'
                    />
                  </Text>
                  <Text
                    color='blue400'
                    size='12px'
                    weight={500}
                    cursor='pointer'
                    onClick={() =>
                      this.props.identityVerificationActions.verifyIdentity(
                        2,
                        false,
                        'BalancesFlyout'
                      )
                    }
                  >
                    <FormattedMessage
                      id='buttons.show_me_how'
                      defaultMessage='Show me how.'
                    />
                  </Text>
                </TextGroup>
              </StatusWrapper>
            )
          case 1:
            switch (val.userData.kycState) {
              case 'NONE':
                return (
                  <StatusWrapper>
                    <Text color='white' size='14px' weight={600}>
                      <FormattedMessage
                        id='copy.identity_verification.upgrade_to_gold'
                        defaultMessage='Upgrade to Gold'
                      />
                    </Text>
                    <TextGroup
                      inline
                      style={{ marginTop: '8px', lineHeight: '1' }}
                    >
                      <Text color='grey400' size='12px' weight={500}>
                        <FormattedMessage
                          id='copy.identity_verification.continue_to_gold'
                          defaultMessage='Continue with your identity verification to start buying, borrowing, and earning interest.'
                        />
                      </Text>
                      <Text
                        color='blue400'
                        size='12px'
                        weight={500}
                        cursor='pointer'
                        onClick={() =>
                          this.props.identityVerificationActions.verifyIdentity(
                            2,
                            false,
                            'BalancesFlyout'
                          )
                        }
                      >
                        <FormattedMessage
                          id='buttons.show_me_how'
                          defaultMessage='Show me how.'
                        />
                      </Text>
                    </TextGroup>
                  </StatusWrapper>
                )
              case 'PENDING':
              case 'UNDER_REVIEW':
                return (
                  <StatusWrapper>
                    <Text color='white' size='14px' weight={600}>
                      <FormattedMessage
                        id='copy.identity_verification.pending'
                        defaultMessage='Pending KYC'
                      />
                    </Text>
                    <TextGroup
                      inline
                      style={{ marginTop: '8px', lineHeight: '1' }}
                    >
                      <Text color='grey400' size='12px' weight={500}>
                        <FormattedMessage
                          id='scenes.exchange.getstarted.status.underreview.title1'
                          defaultMessage='Account Verification Under Review'
                        />
                      </Text>
                      <Text
                        color='blue400'
                        size='12px'
                        weight={500}
                        cursor='pointer'
                        onClick={() => {
                          this.props.profileActions.fetchUserDataLoading()
                          this.props.profileActions.fetchUser()
                        }}
                      >
                        <FormattedMessage
                          id='modals.simplebuy.refresh'
                          defaultMessage='Refresh'
                        />
                      </Text>
                    </TextGroup>
                  </StatusWrapper>
                )
              case 'REJECTED':
              case 'EXPIRED':
                return (
                  <StatusWrapper>
                    <Text color='white' size='14px' weight={600}>
                      <FormattedMessage
                        id='copy.identity_verification.failed'
                        defaultMessage='Identity Verification Failed'
                      />
                    </Text>
                    <TextGroup
                      inline
                      style={{ marginTop: '8px', lineHeight: '1' }}
                    >
                      <Text color='grey400' size='12px' weight={500}>
                        <FormattedMessage
                          id='copy.identity_verification.problem'
                          defaultMessage='There was a problem verifying your identity.'
                        />
                      </Text>
                      <Link
                        href='https://support.blockchain.com'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Text color='red600' size='12px' weight={500}>
                          <FormattedMessage
                            id='buttons.contact_support'
                            defaultMessage='Contact Support'
                          />
                        </Text>
                      </Link>
                    </TextGroup>
                  </StatusWrapper>
                )
              default:
                return null
            }
          case 2:
            return (
              <StatusWrapper>
                <Text
                  color='white'
                  size='14px'
                  weight={600}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Image
                    name='gold-verified'
                    height='20px'
                    style={{ marginRight: '8px' }}
                  />
                  <FormattedMessage
                    id='components.identityverification.tiercard.gold'
                    defaultMessage='Gold Level'
                  />
                </Text>
              </StatusWrapper>
            )
        }
      },
      Loading: () => null,
      Failure: () => null,
      NotAsked: () => null
    })
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  identityVerificationActions: bindActionCreators(
    actions.components.identityVerification,
    dispatch
  ),
  profileActions: bindActionCreators(actions.modules.profile, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type OwnProps = {}
type SuccessStateType = {
  userData: UserDataType
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}
type Props = OwnProps & ConnectedProps<typeof connector>
type State = {}

export default connector(WalletKycStatus)
