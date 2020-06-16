import { lift } from 'ramda'

import { RootState } from 'data/rootReducer'
import { selectors } from 'data'

import { convertPaxToFiat } from 'core/exchange'
import { FiatType, LoanType, OpenBorrowStatusEnum } from 'core/types'
import { getRatesSelector } from 'components/Balances/wallet/selectors'
import { RatesType } from 'data/types'

import { SuccessStateType } from '.'

export const getData = (state: RootState) => {
  // 🚨 ONLY PAX
  const borrowHistoryR = selectors.components.borrow.getBorrowHistory(state)
  const walletCurrencyR = selectors.core.settings.getCurrency(state)
  const ratesR = getRatesSelector('PAX', state)

  const transform = (
    borrowHistory: Array<LoanType>,
    rates: RatesType,
    walletCurrency: FiatType
  ): SuccessStateType => {
    const activeBorrows = borrowHistory.filter(
      loan => loan.status in OpenBorrowStatusEnum
    )
    const balances = activeBorrows.map(loan =>
      Number(loan.principal.amount[0].amount)
    )
    const paxBalance = balances.reduce((acc, cur) => (acc += cur), 0)
    const balance = convertPaxToFiat({
      value: paxBalance,
      toCurrency: walletCurrency,
      fromUnit: 'WEI',
      rates
    }).value
    return {
      balance,
      walletCurrency
    }
  }

  return lift(transform)(borrowHistoryR, ratesR, walletCurrencyR)
}
