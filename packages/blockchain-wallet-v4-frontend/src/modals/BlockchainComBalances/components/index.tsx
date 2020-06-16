import React from 'react'
import styled from 'styled-components'

import { SkeletonRectangle } from 'blockchain-info-components'

const CustomSkeleton = styled(SkeletonRectangle)`
  margin-top: 6px;
`

export const BalanceLoader = () => {
  return <CustomSkeleton height='14px' width='42px' bgColor='grey300' />
}
