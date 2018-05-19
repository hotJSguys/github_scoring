import React from 'react'
import styled from 'react-emotion'

const Avatar = styled('div')`
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: .15s;
    img {
      border-radius: 100px;
      border: solid 3px rgb(210,128,34);
      transition: .15s;
    }
    &:hover {
    img {
      border: solid 3px rgb(238,124,65);
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