import { lift } from 'ramda'

import { RootState } from 'data/rootReducer'
import { selectors } from 'data'

import { CoinType, FiatType, InterestAccountBalanceType } from 'core/types'
import { convertBaseToStandard } from 'data/components/exchange/services'
import { convertCoinToFiat } from 'core/exchange'
import { getRatesSelector } from 'components/Balances/wallet/selectors'

export const getData = (state: RootState) => {
  const interestBalanceR = selectors.components.interest.getInterestAccountBalance(
    state
  )
  const walletCurrencyR = selectors.core.settings.getCurrency(state)

  const transform = (
    interestBalance: InterestAccountBalanceType,
    walletCurrency: FiatType
  ) => {
    const keys = Object.keys(interestBalance) as Array<CoinType>
    const balances = keys.map((item: CoinType) => {
      const value = interestBalance[item]
      const ratesR = getRatesSelector(item, state)

      const transform = rates => {
        const stdAmt = value
          ? convertBaseToStandard(item, value.totalInterest)
          : 0
        return Number(convertCoinToFiat(stdAmt, item, walletCurrency, rates))
      }

      return lift(transform)(ratesR)
    })

    return {
      balance: balances.reduce(
        (acc, balance) => (acc += balance.getOrElse(0)),
        0
      ),
      walletCurrency
    }
  }

  return lift(transform)(interestBalanceR, walletCurrencyR)
}
