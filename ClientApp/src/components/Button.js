import React, { Component } from 'react';
import styles from '../styles/Button.module.css'


export class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <button className={styles.button} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}
