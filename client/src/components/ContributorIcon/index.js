import React from 'react'
import styled from 'react-emotion'

const Avatar = styled('div')`
    width: 50px;
    height: 50px;
    margin: 5px;
    cursor: pointer;
    transition: .15s;
    img {
      border-radius: 100px;
      border: solid 3px rgba(255,55,255,0.1);
      transition: .15s;
      box-sizing: border-box;
    }
    &:hover {
    img {
      border: solid 3px rgba(255,55,255,1);
    }
	&:active {
    	transform: scale(0.92)
	}
    }
`

const ContributorIcon = (props) => {
    return (
        <Avatar>
            <img src={props.src} width="100%" height="100%"/>
        </Avatar>
    )
}

export default ContributorIcon