import React from 'react'
import styled from 'react-emotion'

import  loader   from '../../assets/img/loader.svg'

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
`

const Image = styled('img')`
  width: 6em;
`

const Loader = () => {
  return (
    <Wrapper>
      <Image src={loader} />
    </Wrapper>
  )
}

export default Loader