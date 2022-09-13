import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../../pages/Carregando';
import { getUser } from '../../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      carregando: true,
    };
  }

  async componentDidMount() {
    const name = await getUser();
    this.setState({
      userName: name,
      carregando: false,
    });
  }

  render() {
    const { carregando, userName: { name } } = this.state;
    return (
      <header data-testid="header-component">
        {carregando ? <Carregando />
          : <p data-testid="header-user-name">{name}</p>}
        <nav>
          <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
