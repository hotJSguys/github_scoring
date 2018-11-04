import React from 'react';
import styled from 'react-emotion';

import loader from '../../assets/img/loader.svg';

const Loader = styled('div')`
  display: flex;
  justify-content: center;
`;

const Image = styled('img')`
  width: 6em;
`;

export default () => {
  return (
    <Loader>
      <Image src={loader} />
    </Loader>
  );
};
