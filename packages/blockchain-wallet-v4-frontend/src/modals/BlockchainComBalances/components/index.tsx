import React from 'react'
import styled from 'styled-components'

import { Icon, SkeletonRectangle } from 'blockchain-info-components'

export const Header = styled.div`
  display: flex;
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
  padding-top: 20px;
  padding-right: 24px;
`
export const BalanceIcon = styled(Icon)`
  padding-top: 20px;
`

export const StatusWrapper = styled.div`
  padding: 16px;
  margin-top: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.grey800};
  transition: background-color 0.3s;
`
export const Wrapper = styled.div`
  display: flex;
  padding-left: 24px;
  padding-bottom: 20px;
  transition: background-color 0.3s;
  span[role='button'] {
    transition: color 0.3s;
  }
  &.link {
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.grey800};
      span[role='button'] {
        color: ${props => props.theme.white};
      }
      ${StatusWrapper} {
        background-color: ${props => props.theme.grey900};
      }
    }
  }
`

const CustomSkeleton = styled(SkeletonRectangle)`
  margin-top: 6px;
`
export const BalanceLoader = () => {
  return <CustomSkeleton height='14px' width='42px' bgColor='grey300' />
}
