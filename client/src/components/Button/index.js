import React from 'react'
import styled from 'react-emotion'


const _Button = styled('div')`
    display: inline-block;
    color: #fff;
	cursor: pointer;
	background: linear-gradient(40deg, rgb(210, 106, 194), rgb(70, 201, 229));
	min-width: 25px;
	max-width: 100px;
	padding: 10px 20px;
	border-radius: 10px;
	border: none;
	font-size: 22px;
	font-weight: bold;
	font-family: Arial;
	text-align: center;
	transition: .2s;
	margin: 3px;
	&:hover {
	   background: linear-gradient(40deg, rgb(230, 126, 214), rgb(90, 221, 249));
	}
	&:active {
    	transform: scale(0.92)
	}
`

const Button = (props) => {
    return (
        <_Button>{props.text}</_Button>
    )
}

export default Button
