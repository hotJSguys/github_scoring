import React from 'react';
import styled from 'react-emotion';

const Wrapper = styled('div')``;
const General = styled('div')``;

const CardCommit = (props) => {
  return (
    <Wrapper>
      <General>
        <a href={props.link}>{props.description}</a>
        <div>
          <img src={props.url_avatar} width="60" />
          <a href="asd">{props.name}</a>
          <span>commited {props.date}</span>
        </div>
      </General>
      <a className="browse">
        <img />
      </a>
    </Wrapper>
  );
};

export default CardCommit;
