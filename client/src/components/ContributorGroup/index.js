import React from 'react';
import styled from 'react-emotion';

import ContributorIcon from '../ContributorIcon';

const AvatarsGroup = styled('div')`
  display: inline-flex;
  flex-direction: ${(props) => props.flexDirection};
  background-color: #80afad;
  padding: 2px;
  border-radius: 3px;
  box-sizing: border-box;
  align-items: center;
`;

const ContributorGroup = (props) => {
  return (
    <AvatarsGroup flexDirection={props.flexDirection}>
      <ContributorIcon src="https://avatars3.githubusercontent.com/u/10588170?s=460&v=4" />
      <ContributorIcon src="https://avatars0.githubusercontent.com/u/14940802?s=460&v=4" />
      <ContributorIcon src="https://avatars1.githubusercontent.com/u/18092308?s=460&v=4" />
    </AvatarsGroup>
  );
};

export default ContributorGroup;
