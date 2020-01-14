import {
  BlueCartridge,
  CustomCartridge,
  ErrorCartridge,
  GreyCartridge,
  SuccessCartridge
} from '../AirdropInfo/model'
import { Button, Link, Text } from 'blockchain-info-components'
import { CampaignInfoType } from 'data/types'
import { FormattedMessage } from 'react-intl'
import { LinkDispatchPropsType } from '..'
import { model } from 'data'
import { Props } from '.'
import React from 'react'
import styled from 'styled-components'

const { KYC_STATES } = model.profile

const BlueCartridgeCTA = styled(CustomCartridge)`
  cursor: pointer;
  background-color: ${(props) => props.theme.blue600};
  font-weight: 600;
`

const DateOrAmount = styled.div`
  height: 100%;
  padding-left: 20px;
  border-left: 1px solid ${props => props.theme.grey000};

  > div:first-child {
    margin-bottom: 4px;
  }
`

const Ended = () => {
  return (
    <GreyCartridge>
      <FormattedMessage
        id='scenes.airdrop.stx.expired'
        defaultMessage='Offer Expired'
      />
    </GreyCartridge>
  )
}

export const StxHeader = ({ stxCampaign }: { stxCampaign: CampaignInfoType }) => {
  switch (stxCampaign.userCampaignState) {
    case 'TASK_FINISHED':
    case 'REWARD_RECEIVED':
      return <FormattedMessage
        id='scenes.airdrops.stx.wallet.title'
        defaultMessage='My Blockstack Wallet'
      />
    default:
      return <FormattedMessage
        id='scenes.airdrops.stx'
        defaultMessage='Blockstack'
      />
  }
}

export const StxInfo = ({ stxCampaign }: { stxCampaign: CampaignInfoType }) => {
  switch (stxCampaign.userCampaignState) {
    case 'TASK_FINISHED':
      return <>
        <Text color='grey800' size='14px' weight={700} style={{ margin: '16px 0 4px' }}>
          <FormattedMessage
            id='scenes.airdrops.stx.wallet.q1'
            defaultMessage='Where are my Stacks?'
          />
        </Text>
        <Text size='13px' color='grey600' weight={500}>
          <FormattedMessage
            id='scenes.airdrops.stx.wallet.a1'
            defaultMessage='Your Stacks (STX) are saved in your Blockchain Wallet.'
          />
        </Text>
      </>
    // Maybe design will have new design when state switches to REWARD_RECEIVED
    // case 'REWARD_RECEIVED:
    default:
      return <Text
        size='12px'
        color='grey600'
        weight={500}
        lineHeight='1.5'
        style={{ marginTop: '16px' }}
      >
        <FormattedMessage
          id='scenes.airdrop.stx.stxinfo1'
          defaultMessage='Own your digital identity and data with hundreds of decentralized apps built with Blockstack.'
        />{' '}
        <Link
          href='https://blockstack.org/try-blockstack'
          target='_blank'
          rel='noopener noreferrer'
          size='12px'
        >
          <FormattedMessage
            id='scenes.airdrop.stx.learnmore'
            defaultMessage='Learn more'
          />
        </Link>
      </Text>
  }
}

export const StxDateOrAmount = ({ stxCampaign }: { stxCampaign: CampaignInfoType }) => {
  switch (stxCampaign.userCampaignState) {
    case 'TASK_FINISHED':
      return null
    case 'REWARD_RECEIVED':
      return <DateOrAmount>
        <Text size='16px' color='grey800' weight={600}>
          {stxCampaign.userCampaignTransactionResponseList.length && stxCampaign.userCampaignTransactionResponseList[0].withdrawalQuantity}
          {' STX'}
        </Text>
        <Text size='12px' color='grey600' weight={500}>
          <FormattedMessage
            id='scenes.airdrop.stx.wallet'
            defaultMessage='My Blockstack Wallet'
          />
        </Text>
      </DateOrAmount>
    default:
      return <DateOrAmount>
        <Text size='16px' color='grey800' weight={600}>
          <FormattedMessage
            id='scenes.airdrop.stx.jan'
            defaultMessage='Jan. 2020'
          />
        </Text>
        <Text size='12px' color='grey600' weight={500}>
          <FormattedMessage
            id='scenes.airdrop.stx.date'
            defaultMessage='Airdrop Date'
          />
        </Text>
      </DateOrAmount>
  }
}

export const StxStatus = ({
  userCampaignsInfoResponseList,
  kycState,
  identityVerificationActions
}: Props & LinkDispatchPropsType) => {
  const stxCampaign = userCampaignsInfoResponseList.find(
    (campaign: CampaignInfoType) => campaign.campaignName === 'BLOCKSTACK'
  )

  if (
    kycState !== KYC_STATES.VERIFIED &&
    stxCampaign && stxCampaign.campaignState === 'ENDED'
  ) {
    return <Ended />
  }

  switch (kycState) {
    case KYC_STATES.REJECTED:
    case KYC_STATES.EXPIRED:
      return (
        <ErrorCartridge>
          <FormattedMessage
            id='scenes.airdrop.stx.ineligible'
            defaultMessage='Ineligible'
          />
        </ErrorCartridge>
      )
    case KYC_STATES.PENDING:
    case KYC_STATES.UNDER_REVIEW:
      return (
        <GreyCartridge>
          <FormattedMessage
            id='scenes.airdrop.stx.pending'
            defaultMessage='Pending KYC'
          />
        </GreyCartridge>
      )
    case KYC_STATES.VERIFIED:
      if (stxCampaign) {
        switch (stxCampaign.userCampaignState) {
          case 'FAILED':
            return (
              <ErrorCartridge>
                <FormattedMessage
                  id='scenes.airdrop.stx.failed'
                  defaultMessage='Failed'
                />
              </ErrorCartridge>
            )
          case 'REWARD_RECEIVED':
            return (
              <SuccessCartridge>
                <FormattedMessage
                  id='scenes.airdrop.stx.received'
                  defaultMessage='Received'
                />
              </SuccessCartridge>
            )
          case 'NONE':
            if (stxCampaign.campaignState === 'ENDED') {
              return <Ended />
            }

            return (
              <BlueCartridgeCTA
                onClick={() =>
                  identityVerificationActions.claimCampaignClicked('BLOCKSTACK')
                }
              >
                <FormattedMessage
                  id='scenes.airdrop.stx.claim'
                  defaultMessage='Claim'
                />
              </BlueCartridgeCTA>
            )
          case 'TASK_FINISHED':
            return (
              <BlueCartridge>
                <FormattedMessage
                  id='scenes.airdrop.stx.reward_pending'
                  defaultMessage='Reward Pending'
                />
              </BlueCartridge>
            )
          case 'REWARD_SEND':
          case 'REGISTERED':
            return stxCampaign.attributes['x-campaign-reject-reason'] ? (
              <ErrorCartridge>
                <FormattedMessage
                  id='scenes.airdrop.stx.ineligible'
                  defaultMessage='Ineligible'
                />
              </ErrorCartridge>
            ) : (
                <SuccessCartridge>
                  <FormattedMessage
                    id='scenes.airdrop.stx.claimed'
                    defaultMessage='Claimed'
                  />
                </SuccessCartridge>
              )
        }
        break
      } else {
        return null
      }
    case KYC_STATES.NONE:
      return <Ended />
    default:
      return <Ended />
  }
}

export const StxShare = ({ tags, kycState, userCampaignsInfoResponseList }: Props) => {
  const stxCampaign = userCampaignsInfoResponseList.find(
    (campaign: CampaignInfoType) => campaign.campaignName === 'BLOCKSTACK'
  )

  if (stxCampaign) {
    switch (stxCampaign.userCampaignState) {
      case 'TASK_FINISHED':
        return <Text size='12px' color='grey600' weight={500}>
          <FormattedMessage
            id='scenes.airdrop.stx.wallet.balance'
            defaultMessage='Please note the balance is currently non-transferable. Learn more about this and future wallet support for STX'
          />
          {' '}
          <Link
            href='https://support.blockchain.com/hc/en-us/articles/360038745191'
            target='_blank'
            size='12px'
            weight={500}
            style={{ textDecoration: 'underline' }}
          >
            <FormattedMessage
              id='scenes.airdrops.blockstack.wallet.here'
              defaultMessage='here'
            />
          </Link>
          {'.'}
        </Text>

      // Maybe design will have new design when state switches to REWARD_RECEIVED
      // case 'REWARD_RECEIVED:
    }
  }

  switch (kycState) {
    case KYC_STATES.REJECTED:
    case KYC_STATES.EXPIRED:
    case KYC_STATES.PENDING:
    case KYC_STATES.UNDER_REVIEW:
    case KYC_STATES.NONE:
      return (
        <Link
          href='https://blockstack.org/try-blockstack'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button nature='light' fullwidth>
            <FormattedMessage
              id='scenes.airdrop.stx.learnmore'
              defaultMessage='Learn More'
            />
          </Button>
        </Link>
      )
    case KYC_STATES.VERIFIED:
      return tags.BLOCKSTACK ? (
        <Link
          href='https://blockchain.com/getcrypto'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button nature='light' fullwidth >
            <FormattedMessage
              id='scenes.airdrop.stx.share'
              defaultMessage='Share'
            />
          </Button>
        </Link>
      ) : (
          <Link
            href='https://blockstack.org/try-blockstack'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button nature='light' fullwidth >
              <FormattedMessage
                id='scenes.airdrop.stx.learnmore'
                defaultMessage='Learn More'
              />
            </Button>
          </Link>
        )
    default:
      return null
  }
}