import React, { Component } from 'react';
import AdminPanelService from '../services/AdminPanel';

const adminPanelService = new AdminPanelService();

export class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: null,
        dateRegistration: null,
        dateLastActivity: null
    };
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleSubmit(event) {
    event.preventDefault();

    const user = Object.assign({}, this.state)
    
    adminPanelService.create(user)
      .then((response) => {
        console.log('RESPONSE: ', response)
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
                <input type="text" name="userId" onChange={this.handleInputChange} />
            </label>
            <label>
                Date registration:
                <input type="date" name="dateRegistration" onChange={this.handleInputChange}/>
            </label>
            <label>
                Date last activity
                <input type="date" name="dateLastActivity" onChange={this.handleInputChange}/>
            </label>
            
            <input type="submit" value="Save" />
      </form>
    );
  }
}
