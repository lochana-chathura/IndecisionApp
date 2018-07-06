import React, { Component } from 'react';
import './styles/styles.css';
import 'normalize.css/normalize.css'; //npm install normalize.css
import { Header } from './components/Header';
import { Action } from './components/Action';
import { AddOption } from './components/AddOption';
import { OptionModal } from './components/OptionModal';
import { Options } from './components/Options';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleNewOption = this.handleNewOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.actionOkPress = this.actionOkPress.bind(this);
    this.state = {
      options: [],
      selectedOption: undefined
    };
  }
  componentDidMount() {
    const json = localStorage.getItem("options");
    const options = JSON.parse(json);
    this.setState(() => {
      return {
        options
      };
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }
  handleRemoveAll() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  handlePick() {
    let randomLocation = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomLocation]
    this.setState(() => {
      return {
        selectedOption: option
      };
    });
  }
  actionOkPress() {
    this.setState(() => {
      return {
        selectedOption: undefined
      };
    });
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((option) => {
          return optionToRemove !== option;
        })
      }
    });
  }
  handleNewOption(option) {
    if (!option) {
      return "Please enter a valid item"
    } else if (this.state.options.indexOf(option) > -1) {
      return "Added item already exist in the list"
    }
    this.setState((prevState) => {
      return {
        options: prevState.options.concat([option])
      };
    });
  }
  render() {
    return (
      <div>
        <Header appName="Indecision App" appTask="This app will keep a list of activities need to be done and pick one for you" />
        <div className="container">
          <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
          <Options options={this.state.options} removeAll={this.handleRemoveAll} handleDeleteOption={this.handleDeleteOption} />
          <AddOption handleNewOption={this.handleNewOption} />
        </div>
        <OptionModal selectedOption={this.state.selectedOption} actionOkPress={this.actionOkPress} />
      </div>
    );
  }
}
export default App;
