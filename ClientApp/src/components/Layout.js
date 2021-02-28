import React, { Component } from 'react';
import { Container } from 'reactstrap';
import styles from '../styles/Layout.module.css';


export class Layout extends Component {
  render () {
    return (
      <div className={styles.layout}>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
