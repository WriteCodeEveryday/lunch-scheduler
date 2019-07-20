import React from 'react'
export default class extends React.Component {
  render() {
    return (<React.Fragment>
      <h2 className="fs-title">{this.props.primary}</h2>
      <h3 className="fs-subtitle">{this.props.secondary}</h3>
    </React.Fragment>)
  }
}