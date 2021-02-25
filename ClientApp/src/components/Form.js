import React, { Component } from 'react';
import axios from 'axios';

export class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: null,
        dateRegistration: null,
        dateLastAcitivity: null
    };
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`adminpanel/CreateUser`, { user: this.state })
      .then(res => {
        console.log(res);
    })
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value    
    });
  }


  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <label>
                UserId:
                <input type="number" name="userId" onChange={this.handleInputChange} />
            </label>
            <label>
                Date registration:
                <input type="date" name="dateRegistration" onChange={this.handleInputChange}/>
            </label>
            <label>
                Date last activity
                <input type="date" name="dateLastAcitivity" onChange={this.handleInputChange}/>
            </label>
            
            <input type="submit" value="Save" />
      </form>
    );
  }
}
