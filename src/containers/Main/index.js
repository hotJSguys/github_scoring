import React from 'react';
import styled from 'react-emotion';

import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Card from '../../components/CardCommit';

import Graph from '../../components/Graph';
// import ProjectInform from '../../components/ProjectInform'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const GeneralInformation = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const AllComponentsListTest = styled('div')`
  border: dashed 2px #000;
  padding: 10px;
  background-color: #eee;
`;

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ loader: true });
  }

  render() {
    return (
      <Wrapper>
        <Card
          link="1234"
          description="description"
          url_avatar="https://cdn.dribbble.com/users/3460/screenshots/5578703/m-avatar-ryan.png"
          name="dick name"
          date="14.12.88"
        />
        <Input onChange={this.handleChange} />
        {this.state.loader == true ? <Loader /> : null}
      </Wrapper>
    );
  }
}
