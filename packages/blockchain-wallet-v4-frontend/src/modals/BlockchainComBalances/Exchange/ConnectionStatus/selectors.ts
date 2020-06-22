import { lift } from 'ramda'
import { RootState } from 'data/rootReducer'
import { selectors } from 'data'

export const getData = (state: RootState) => {
  const isExchangeAccountLinkedR = selectors.modules.profile.isExchangeAccountLinked(
    state
  )
  const isExchangeRelinkRequiredR = selectors.modules.profile.isExchangeRelinkRequired(
    state
  )

  const transform = (isExchangeAccountLinked, isExchangeRelinkRequired) => ({
    isExchangeAccountLinked,
    isExchangeRelinkRequired
  })

  return lift(transform)(isExchangeAccountLinkedR, isExchangeRelinkRequiredR)
}
