import React, { Component } from 'react';
import styles from '../styles/TextField.module.css';


export class TextField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.textField}>
                <input name={this.props.name} type={this.props.type} onChange={this.props.onChange} defaultValue={this.props.defaultValue}/>
            </div>
        );
    }
}
