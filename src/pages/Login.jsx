import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: false,
      saveButtonDisabled: true,
      redirect: false,
    };
  }

  nameInputChange = ({ target }) => {
    const { name, value } = target;
    const minimumCharacters = 3;
    this.setState({
      [name]: value,
    });

    if (value.length >= minimumCharacters) {
      this.setState({
        saveButtonDisabled: false,
      });
    } else {
      this.setState({
        saveButtonDisabled: true,
      });
    }
  };

  ButtonNameClick = async () => {
    const { name } = this.state;
    this.setState({
      carregando: true, // conforme espera a resposta da api o estado carregando é true
    });
    await createUser({ name });
    this.setState({
      carregando: false,
      redirect: true,
    });
  };

  render() {
    const { name, carregando, saveButtonDisabled, redirect } = this.state;
    return (
      <div data-testid="page-login" className="container-form-login">
        { carregando && <Carregando /> }
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            name="name"
            value={ name }
            onChange={ this.nameInputChange }
          />
        </form>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ saveButtonDisabled }
          onClick={ this.ButtonNameClick }
        >
          Entrar
        </button>
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
