import React from 'react'
import ReactDOM from 'react-dom'

import Main from './containers/Main'


export default class App extends React.Component {

  render() {
    return(
      <Main />
    )
  }

}



ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept();
}