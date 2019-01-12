import React from 'react';
import styled from 'react-emotion'

const Wrapper = styled('div')`
  cursor: pointer;
`

const Avatar = (props) => {
  return (
    <Wrapper onClick={props.onClick}>
      <img src={props.link} />
    </Wrapper>
  )
}
export default Avatar;
