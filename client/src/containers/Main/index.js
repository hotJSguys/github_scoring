import React from 'react'
import styled from 'react-emotion'

import Input from '../../components/Input'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import ContributorGroup from '../../components/ContributorGroup'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AllComponentsListTest = styled('div')`
    border: dashed 2px #000;
    padding: 10px;
    background-color: #eee;
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
        <AllComponentsListTest>
            <div>
                <Button text="Кнопка 1" />
                <Button text="Кнопка 2" />
                <Button text="Кнопка 3" />
            </div>
           <div>
               <ContributorGroup flexDirection="row"/>
           </div>
        </AllComponentsListTest>
      </Wrapper>
    )
  }

}