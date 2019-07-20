import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import Landing from './partials/landing';
import './index.css'

export default class extends React.Component {
  render() {
    return (<Provider store={store}>
      <Landing />
    </Provider>)
  }
}