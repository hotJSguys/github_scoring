import React from 'react'
import ReactDOM from 'react-dom'

import Main from './containers/Main'
import Auth from './containers/Auth'
//import this

export default class App extends React.Component {

  render() {
    return(
      <Auth />
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept();
}