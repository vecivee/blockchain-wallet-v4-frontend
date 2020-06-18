import { lift } from 'ramda'

import { RootState } from 'data/rootReducer'
import { selectors } from 'data'

export const getData = (state: RootState) => {
  const userDataR = selectors.modules.profile.getUserData(state)

  const transform = userData => ({ userData })

  return lift(transform)(userDataR)
}
