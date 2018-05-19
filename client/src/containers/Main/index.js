import React from 'react'
import styled from 'react-emotion'

import Input from '../../components/Input'
import Loader from '../../components/Loader'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
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