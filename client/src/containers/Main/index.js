import React from 'react'
import styled from 'react-emotion'

import Input from '../../components/Input'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import ContributorIcon from '../../components/ContributorIcon'

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

          <Button text="Кнопка 1" />
          <Button text="Кнопка 2" />
          <ContributorIcon src="https://avatars3.githubusercontent.com/u/10588170?s=460&v=4"/>
      </Wrapper>
    )
  }

}