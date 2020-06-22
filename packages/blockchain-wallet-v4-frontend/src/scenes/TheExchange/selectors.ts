import { lift } from 'ramda'
import { RootState } from 'data/rootReducer'
import { selectors } from 'data'

export const getData = (state: RootState) => {
  const isExchangeRelinkRequiredR = selectors.modules.profile.isExchangeRelinkRequired(
    state
  )
  const walletAddressesR = selectors.modules.profile.getWalletAddresses(state)

  return lift((isExchangeRelinkRequired, walletAddresses) => ({
    isExchangeRelinkRequired,
    walletAddresses
  }))(isExchangeRelinkRequiredR, walletAddressesR)
}
