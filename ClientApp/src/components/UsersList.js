import React, { Component } from 'react';
import AdminPanelService from '../services/AdminPanel';
import { VerticalBar } from './VerticalBar';
import { Button } from './Button';
import { CreateUserForm } from './Form';
import moment from 'moment';
import styles from '../styles/UsersList.module.css';

const adminPanelService = new AdminPanelService();


export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataset: [],
      rollingRetention: null, 
      toggleSnackBar: false ,
      users: [],
      rows: [],
    };
    
    this.calculate = this.calculate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers()
  }

  handleInputChange(value, name, row) {
    console.log('TEST: ', value, name, row)
    row[name] = value;
    this.updateUser(row);
  }

  calculate() {
    adminPanelService.calculate()
      .then((result) => {
          this.setState({ 
              dataset: result.content.usersLifetime, 
              rollingRetention: result.content.rollingRetention,
              toggleSnackBar: true 
          });
      })
}

getUsers() {
  adminPanelService.getUsers()
    .then((response) => {
      this.setState({
        users: response.content,
      })
    })
}

updateUser(user) {
  adminPanelService.update(user)
    .then((response) => {
      // this.getUsers()
    })
}

compare(a, b) {
  let comparison = 0;
  if (a.userId > b.userId) {
    comparison = 1;
  } else if (a.userId < b.userId) {
    comparison = -1;
  }
  return comparison;
}
  
  renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <td>UserId</td>
            <td>Date Registration</td>
            <td>Date Last Activity</td>
          </tr>
        </thead>
        <tbody>
          {this.state.users.sort(this.compare).map((row) => (
            <tr key={row.userId}>
              <td>{row.userId}</td>
              <td>
                <input
                  type="date"
                  name="dateRegistration"
                  defaultValue={moment(new Date(row.dateRegistration)).format("YYYY-MM-DD") }
                  onChange={(e) => this.handleInputChange(e.target.value, e.target.name, row) }
                />
              </td>
              <td>
                <input 
                  type="date" 
                  name="dateLastActivity"
                  defaultValue={moment(new Date(row.dateLastActivity)).format("YYYY-MM-DD") } 
                  onChange={(e) => this.handleInputChange(e.target.value, e.target.name, row) }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className={styles.usersList}>

        <CreateUserForm onSubmit={this.getUsers} />

        {this.renderTable()}
        
        <VerticalBar dataset={this.state.dataset} />
        
        <div className={styles.textInfo}>
            {this.state.rollingRetention ? <h1>Rolling Retention: {this.state.rollingRetention.toFixed(1)}%</h1> : null}
        </div>

        <Button text={'Calculate'} onClick={this.calculate} />
      </div>
    );
  }
}
