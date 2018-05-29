import React from 'react'
import styled from 'react-emotion'

import Input from '../../components/Input'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import Graph from '../../components/Graph'
// import ProjectInform from '../../components/ProjectInform'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const GeneralInformation = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

export default class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      load: false
    }

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
      this.setState({loader: true})
  }

  render() {
    return(
      
      <Wrapper>
        <Input
          onChange={this.handleChange}
        />
        { this.state.loader == true ? <Loader /> : null}
      </Wrapper>
    )
  }

}