import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';

const InputBox = styled('input')`
  margin: auto;
  padding: 20px;
  width: 400px;

  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  font-size: 21px;
  transition: ease-out 0.5s;

  &:focus {
    box-shadow: 4px 4px 9px rgba(0, 20, 40, 0.1);
    transition: ease-out 0.2s;
  }
`;

const Input = (props) => {
  return (
    <InputBox
      placeholder="Enter repo link"
      type="url"
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
  )
}

export default Input
