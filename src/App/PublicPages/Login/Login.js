import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Page, Card, TextField, Button,
} from '@shopify/polaris';

import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (value, id) => {
    this.setState({ [id]: value });
  };

  submit = async () => {
    const { email, password } = this.state;
    const { loadAuth } = this.props;

    await loadAuth({ email, password });
  };

  render() {
    const { email, password } = this.state;
    const { auth } = this.props;

    return (
      <div className="login">
        <Page title="LOGIN">
          <Card sectioned>
            <TextField
              id="email"
              label="Email"
              type="text"
              value={email}
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
            <Button onClick={this.submit} loading={auth.loginLoading}>
              Entrar
            </Button>
          </Card>
        </Page>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loadAuth: PropTypes.func.isRequired,
};

export default Login;
