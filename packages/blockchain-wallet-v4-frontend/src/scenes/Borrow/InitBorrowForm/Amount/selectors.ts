import { CoinType, OfferType } from 'core/types'
import {
  getBchBalance,
  getBtcBalance,
  getEthBalance,
  getPaxBalance,
  getRatesSelector,
  getXlmBalance
} from 'components/Balances/wallet/selectors'
import { lift } from 'ramda'
import { selectors } from 'data'

const getBalanceSelector = (coin: CoinType) => {
  switch (coin) {
    case 'BTC':
      return getBtcBalance
    case 'BCH':
      return getBchBalance
    case 'ETH':
      return getEthBalance
    case 'PAX':
      return getPaxBalance
    case 'XLM':
      return getXlmBalance
  }
}

export const getBalance = state => {
  const offersR = selectors.components.borrow.getOffers(state)
  const values = selectors.form.getFormValues('initBorrow')(state) as {
    coin: CoinType
  }
  const balanceSelector = getBalanceSelector(values.coin)
  const balanceR = balanceSelector(state)

  const ratesR = getRatesSelector(values.coin, state)

  const transform = (offers: Array<OfferType>, balance, rates) => {
    const offer = offers.find(
      offer => offer.terms.collateralCcy === values.coin
    )
    const max = offer ? balance / offer.terms.collateralRatio : balance

    return {
      values,
      offers,
      rates,
      offer,
      balance,
      max
    }
  }

  return lift(transform)(offersR, balanceR, ratesR)
}
