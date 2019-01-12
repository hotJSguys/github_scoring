import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled('div')``

const CardCommit = (props) => {
  return (
    <Wrapper>
      <General>
        <a href={props.link}>{props.description}</a>
        <div>
          <img src={props.url_avatar}/>
          <a>{props.name}</a>
          <span>{props.date}</span>
        </div>
      </General>
      <a>
        <img />
      </a>
    </Wrapper>
  )
}

export default CardCommit