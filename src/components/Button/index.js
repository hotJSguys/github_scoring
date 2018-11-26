import React from 'react';
import styled from 'react-emotion';

const _button = styled('div')`
  display: inline-block;
  color: #fff;
  cursor: pointer;
  min-width: 25px;
  max-width: 100px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid black;
  font-size: 22px;
  font-weight: bold;
  font-family: Arial;
  text-align: center;
  transition: 0.15s;
  margin: 3px;
  &:active {
    transform: scale(0.92);
  }
`;

const Button = (props) => <_button>{props.text}</_button>;
export default Button;
