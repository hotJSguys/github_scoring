import React from 'react'
import ReactDOM from 'react-dom'

import Main from './containers/Main'
//import this



const App = () => {
  return (
    // here add component
    <Main />
  )
}




ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept();
}