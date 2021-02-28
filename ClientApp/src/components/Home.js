import React, { Component } from 'react';
import { UsersList } from './UsersList';
import styles from '../styles/Home.module.css';


export class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <UsersList />
      </div>
    );
  }
}
