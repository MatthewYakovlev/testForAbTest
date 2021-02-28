import React, { Component } from 'react';
import { Button } from './Button';
import { TextField } from './TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AdminPanelService from '../services/AdminPanel';
import styles from '../styles/Form.module.css';

const adminPanelService = new AdminPanelService();

export class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      dateRegistration: null,
      dateLastActivity: null,
      isToggledSnackbar: false,
      toggleText: null
    };
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {userId, dateRegistration, dateLastActivity} = this.state;
    
    adminPanelService.create({userId, dateLastActivity, dateRegistration})
      .then((response) => {
        if (response.is_error) {
          this.setState({
            toggleText: 'Error try again =(',
            isToggledSnackbar: true
          })
        } else {
          this.setState({
            toggleText: 'User created!',
            isToggledSnackbar: true
          })

          this.props.onSubmit()
        }
      })
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value

    this.setState({
      [name]: value
    });
  }

  handleClose() {
    this.setState({
      isToggledSnackbar: false
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            onClose={this.handleClose}
            open={this.state.isToggledSnackbar}
            autoHideDuration={1000}
            message={this.state.toggleText}
        />
        <form className={styles.form} noValidate autoComplete="off">
          <TextField 
            name={'userId'}
            type={'number'}
            onChange={this.handleInputChange}
          />
          <TextField
            name={'dateRegistration'}
            type={'date'}
            defaultValue={'2021-01-01'}
            onChange={this.handleInputChange}
          />
          <TextField
            name={'dateLastActivity'}
            type={'date'}
            defaultValue={'2021-01-01'}
            onChange={this.handleInputChange}
          />
          <Button text={'Save'} onClick={this.handleSubmit.bind(this)}/>
        </form>
      </div>
    );
  }
}
