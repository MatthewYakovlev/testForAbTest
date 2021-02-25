import React, { Component } from 'react';
import { CreateUserForm } from './Form';

export class Home extends Component {
  static displayName = Home.name;

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
        <CreateUserForm/>
      </div>
    );
  }

  async getUsers() {
    this.setState({ forecasts: data, loading: false });
  }
}
