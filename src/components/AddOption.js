import React, { Component } from 'react';

export class AddOption extends Component {
    constructor(props) {
      super(props);
      this.addNewOption = this.addNewOption.bind(this);
      this.state = {
        error: undefined
      };
    }
    addNewOption(e) {
      e.preventDefault();
      const newOption = e.target.elements.newOptionInput.value.trim();
      e.target.elements.newOptionInput.value = "";
      const error = this.props.handleNewOption(newOption);
      this.setState(() => {
        return {
          error
        };
      });
    }
    render() {
      return (
        <div>
          <form onSubmit={this.addNewOption}>
            <input type="text" name="newOptionInput"></input>
            <button>Add</button>
          </form>
          {this.state.error}
        </div>
      );
    }
  }