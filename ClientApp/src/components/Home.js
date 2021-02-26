import React, { Component } from 'react';
import { CreateUserForm } from './Form';
import { UsersList } from './UsersList';

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <CreateUserForm />
        <UsersList />
      </div>
    );
  }
}
