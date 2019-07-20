import React from 'react'
export default class extends React.Component {
  render() {
    let className = `${this.props.className} action-button`
    return (<input type="button" 
        name={this.props.name} 
        className={className} 
        value={this.props.value}
        onClick={this.props.onClick}/>)
  }
}