import { lift } from 'ramda'

import { getTotalBalance } from 'components/Balances/total/selectors'
// import { RootState } from 'data/rootReducer'

export const getData = (/* state: RootState */) => {
  const transform = totalBalance => ({
    totalBalance
  })

  return lift(transform)(getTotalBalance)
}
