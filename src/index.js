import React from 'react';
import ReactDOM from 'react-dom';
import css from 'bulma/css/bulma.css';
import '../dist/index.css';

const title = 'Key Information';
const key_notes = ["C", "D", "E" ,"F", "G", "A", "B", "C#" ,"F#", "Gb", "Cb", "Db", "Eb"]
const key_scale_type = ["Major", "Minor"]; 

var comp;


/*
  Component Hierarchy:
    App
    - TopContent
    --  Logo
    - MainContent
    -- UserPrompt
    --- KeySelectorDropDown
*/

class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleKeyNoteChange.bind(this);
    this.handleKeyTypeChange.bind(this);
    this.state = {
      has_chosen:true,
      key_note:"C",
      key_type:"Major",
    };
  }

  componentDidMount(){
    comp = this;
  }

  handleKeyNoteChange(val){
    console.log(val);
    comp.setState({key_note:val});
  }

  handleKeyTypeChange(val){
    console.log(val);
    comp.setState({key_type:val});
  }

  renderLogo(){
    return <Logo />;
  }

  render() {
    return (
      <div class="all-content">
      <div class="top-content">{this.renderLogo()}</div>
      {<MainContent has_chosen={this.state.has_chosen} onTypeChanged={this.handleKeyTypeChange} onNoteChanged={this.handleKeyNoteChange} key_note={this.state.key_note} key_type={this.state.key_type} />}
      </div>
    );
  }
}

class MainContent extends React.Component{
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleTypeChanged = this.handleTypeChanged.bind(this);
    this.handleNoteChanged = this.handleNoteChanged.bind(this);
    this.state = {
      has_chosen:false,
    };
  }
  
  handleConfirmClick(){
    this.setState({has_chosen:true});
  }

  handleNoteChanged(val){
    this.props.onNoteChanged(val)
  }

  handleTypeChanged(val){
    this.props.onTypeChanged(val)
  }

  renderMain(){
    if (this.state.has_chosen){
      return <div>{this.props.key_note}{this.props.key_type}</div>;
    }
    else{
      return  <UserPrompt onTypeChanged={this.handleTypeChanged} onNoteChanged={this.handleNoteChanged} key_note={this.props.key_note}/>;
    }
  }

  render(){
    return(
      <div class="main-content">
        {this.renderMain()}
        <div class="confirm-button"><a class="button is-large confirm" onClick={this.handleConfirmClick}>Confirm</a></div>
      </div>
      
    );
  }
}

class UserPrompt extends React.Component{
  constructor(props) {
    super(props);
    this.handleTypeChanged = this.handleTypeChanged.bind(this);
    this.handleNoteChanged = this.handleNoteChanged.bind(this);    
    this.state = {
    };
  }

  handleNoteChanged(val){
    this.props.onNoteChanged(val)
  }

  handleTypeChanged(val){
    this.props.onTypeChanged(val)
  }

  renderKeySelectorDropDown(i){
    if (i == "notes"){
      return <KeySelectorDropDown value_type={i} onChanged={this.handleNoteChanged} key_note={this.props.key_note} />;
    }
    else{
      return <KeySelectorDropDown value_type={i} onChanged={this.handleTypeChanged} key_note={this.props.key_note} />;
    }

  }

  render() {
    return(
      <div class="prompt"><h1 class="prompt-text">Select A Key!</h1>
        <div class="columns">
          <div class="column">{this.renderKeySelectorDropDown("notes")}</div>
          <div class="column">{this.renderKeySelectorDropDown("scale")}</div>
        </div>
        <br></br>

      </div>
    );
  }
}

class Logo extends React.Component{
  render() {
    return (
      <section class="hero is-medium" id="hero-logo">
        <div class="hero-body">
          <div class="container">
            <h1 class="title" id ='logo'>{title}</h1>s
            <h2 class="subtitle">Slogan</h2>
          </div>
        </div>
      </section>
    );
  }
}

class KeySelectorDropDown extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value_type: null,
      chosen_value:null,
      values: this.set_dropdown_values(this.props.value_type)
    };
  } 

  set_dropdown_values(val_type)
  {
    if (val_type == "notes"){
      return key_notes;
    }
    else if (val_type == "scale"){
      return key_scale_type;
    }
  }

  set_options(opt){
    let optionList = this.state.values.map((option) => 
    <option>{option}</option>);
    return optionList;
  }

  handleChange(e){
    this.props.onChanged(e.target.value)
  }

  render() {
    return (
      <div class="field dropdown">
        <div class="control dropdown-button">
          <div class="select is-large">
            <select value = {this.state.chosen_value} onChange = {this.handleChange} key_note={this.props.key_note}>
              {this.set_options()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
