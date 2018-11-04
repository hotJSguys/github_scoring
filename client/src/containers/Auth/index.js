import React from 'react';
import styled from 'react-emotion';

import github from '../../assets/img/github-sociocon.png';
import gitlab from '../../assets/img/Gitlab.png';

const Wrapper = styled('div')`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Link = styled('a')`
  cursor: pointer;
`;

const Github = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7e7f3;
  width: 50%;
  height: 100%;
  transition: all 0.5s ease-out;
  &:hover {
    width: 60%;
  }
`;

const Gitlab = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4e4e3d;
  width: 50%;
  transition: all 0.5s ease-out;
  &:hover {
    width: 60%;
  }
`;

const Image = styled('img')`
  width: 100px;
`;

export default class Auth extends React.Component {
  render() {
    return (
      <Wrapper>
        <Github>
          <Link href="https://www.youtube.com/watch?v=Ce2KxVdGCMM">
            <Image src={github} />
          </Link>
        </Github>
        <Gitlab>
          <Link href="https://www.youtube.com/watch?v=Ce2KxVdGCMM">
            <Image src={gitlab} />
          </Link>
        </Gitlab>
      </Wrapper>
    );
  }
}
