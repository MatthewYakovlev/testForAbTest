import React, { Component } from 'react';
import AdminPanelService from '../services/AdminPanel';
import Button from '@material-ui/core/Button';
import { VerticalBar } from './VerticalBar';
import styles from '../styles/UsersList.module.css';


const adminPanelService = new AdminPanelService();


export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { dataset: [], rollingRetention: null, toggleSnackBar: false };

    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <div className={styles.usersList}>
        <VerticalBar dataset={this.state.dataset} />
        <div className={styles.textInfo}>
            {this.state.rollingRetention ? <h1>Rolling Retention: {this.state.rollingRetention}%</h1> : null}
        </div>
        <Button variant="contained" color="secondary" onClick={this.calculate}>
            Calculate
        </Button>
      </div>
    );
  }

  getUsers() {
    adminPanelService.getUsers()
      .then((users) => {
        console.log('USERS: ', users)
      })
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
}
