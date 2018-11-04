import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

const Input = styled('input')`
  border: 1px solid #ccc;
  min-width: 200px;
  border-radius: 4px;
  padding: 10px;
  outline: none;
`;

export default (props) => {
  return (
    <Wrapper>
      <Input
        placeholder="Enter repo link"
        type="url"
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </Wrapper>
  );
};
