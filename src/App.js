import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleNewOption = this.handleNewOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.actionOkPress=this.actionOkPress.bind(this);
    this.state = {
      options: [],
      selectedOption : undefined 
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
    const option=this.state.options[randomLocation]
    this.setState(()=>{
      return {
        selectedOption: option
      };
    });
  }
  actionOkPress(){
    this.setState(()=>{
      return{
        selectedOption:undefined
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
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
        <Options options={this.state.options} removeAll={this.handleRemoveAll} handleDeleteOption={this.handleDeleteOption} />
        <AddOption handleNewOption={this.handleNewOption} />
        <OptionModal selectedOption={this.state.selectedOption} actionOkPress={this.actionOkPress} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.appName}</h1>
      <h3>{props.appTask}</h3>
    </div>
  );
};

Header.defaultProps = {
  appName: "React App",
  appTask: "eee"
};

const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do?</button>
    </div>
  );
};

const OptionModal = (props) => (
  <Modal 
    isOpen={!!props.selectedOption} 
    contentLabel="Selected Item"
    onRequestClose={props.actionOkPress}
  >
    <h3>Selected Item</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.actionOkPress}>OK</button>
  </Modal>
);

const Options = (props) => {
  return (
    <div>
      Options
  <button disabled={!props.options.length > 0} onClick={props.removeAll} >Remove All</button>
      {props.options.map((option) => <Option key={option} opt={option} handleDeleteOption={props.handleDeleteOption} />)}
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      {props.opt}
      <button onClick={(e) => { props.handleDeleteOption(props.opt) }}>Remove</button>
    </div>
  );
};

class AddOption extends Component {
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

export default App;
