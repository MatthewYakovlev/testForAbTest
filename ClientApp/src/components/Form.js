import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

  componentDidMount() {}

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
        }
      })
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value    
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
        <form className={styles.form} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField id="standard-basic" label="UserId" name="userId" onChange={this.handleInputChange} />
          <TextField
            id="date"
            label="dateRegistration"
            name="dateRegistration"
            type="date"
            defaultValue="2021-01-01"
            onChange={this.handleInputChange}
          />
          <TextField
            id="date"
            label="dateLastActivity"
            name="dateLastActivity"
            type="date"
            defaultValue="2021-01-01"
            onChange={this.handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>

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
      </div>
    );
  }
}
