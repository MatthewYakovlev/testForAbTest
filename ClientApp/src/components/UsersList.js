import React, { Component } from 'react';
import AdminPanelService from '../services/AdminPanel';

const adminPanelService = new AdminPanelService();


export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <ul>

        </ul>
      </div>
    );
  }

  async getUsers() {
    adminPanelService.getUsers()
      .then((users) => {
        console.log('USERS: ', users)
      })
    this.setState({ users: [], loading: false });
  }
}
