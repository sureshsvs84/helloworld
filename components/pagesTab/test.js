import React, { Component } from 'react';

class Todo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      items: []
    }
  }

  onChange = e => this.setState({ value: e.target.value });

  onEnter = e => {
    if(e.charCode !== 13) return;
    this.addItem();
  };

  onClick = e => {
    this.addItem()
  };

  addItem = () => {
    const { value } = this.state;
    if(!!value.trim()) return;
    this.setState(prev => ({ items: [...prev.items, value], value: '' }))
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            value={value}
            name="abc"
            onChange={this.onChange}
            onKeyPress={this.onEnter}
          />
        </div>
        <button onClick={this.onClick}>Add</button>
      </div>
    )
  }
}