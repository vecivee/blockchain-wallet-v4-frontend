import React from 'react'
import styled from 'styled-components'

import { SkeletonRectangle } from 'blockchain-info-components'

export const Header = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`
export const SmallHeader = styled(Header)`
  margin-bottom: 8px;
`
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Child = styled.div`
  width: 100%;
`
const CustomSkeleton = styled(SkeletonRectangle)`
  margin-top: 6px;
`
export const Wrapper = styled.div`
  display: flex;
  padding: 20px 24px 20px 0px;
  &:not(:first-child) {
    border-top: 1px solid ${props => props.theme.whiteFade100};
  }
`

export const BalanceLoader = () => {
  return <CustomSkeleton height='14px' width='42px' bgColor='grey300' />
}
