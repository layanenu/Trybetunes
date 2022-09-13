import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/musicCard/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      listaDeMusicas: [],
      carregando: false,
      listaDeMusicasFavoritas: [],
    };
  }

  async componentDidMount() {
    await this.adcFavoriteSongs();
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      listaDeMusicas: musics,
    });
  }

  createFavoriteSongList = async (objeto) => {
    this.setState({ carregando: true }, async () => {
      await addSong(objeto);
      await this.adcFavoriteSongs();
      this.setState({ carregando: false });
    });
  };

  adcFavoriteSongs = async () => {
    const getFavorite = await getFavoriteSongs();
    this.setState(({
      listaDeMusicasFavoritas: getFavorite,
    }));
  };

  render() {
    const { listaDeMusicas, carregando, listaDeMusicasFavoritas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          listaDeMusicas.length > 0 && (
            <div>
              <img
                src={ listaDeMusicas[0].artworkUrl60 }
                alt={ listaDeMusicas[0].collectionName }
              />
              <p data-testid="artist-name">{listaDeMusicas[0].artistName}</p>
              <p data-testid="album-name">{listaDeMusicas[0].collectionName}</p>
            </div>)
        }
        { carregando ? <Carregando />
          : listaDeMusicas.map((element, index) => (index > 0 && (
            <div>
              <MusicCard
                key={ element.trackId }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
              />
              <label htmlFor={ index }>
                Favorita
                <input
                  type="checkbox"
                  id={ index }
                  onClick={ async () => {
                    await this.createFavoriteSongList(element);
                    await this.adcFavoriteSongs();
                  } }
                  data-testid={ `checkbox-music-${element.trackId}` }
                  defaultChecked={ listaDeMusicasFavoritas.length > 0 && (
                    listaDeMusicasFavoritas
                      .some((element2) => element2.trackName === element.trackName)
                  ) }
                />
              </label>
            </div>)))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
