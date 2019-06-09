import React, { Component } from 'react';
import Text from './Text';
import PokemonList from './PokemonList';
import PokemonInfo from './PokemonInfo';

class App extends Component {
  constructor() {
    super();

    this.state = {
      source: 'https://pokeapi.co/api/v2/pokemon/',
      pokemons: null,
      error: null,
      json: null,
      pokemon: null,
      loading: true,
      types: null,
      img: true,
    };
  }

  componentDidMount() {
    this.fetchSource();
  }

  fetchSource = async () => {
    const { source } = this.state;

    this.setState({ loading: true });

    try {
      const result = await fetch(source);
      const output = await result.json();

      this.setState({
        pokemon: null,
        types: null,
        pokemons: output.results,
        json: output,
        loading: false,
      });
    } catch (e) {
      this.setState({ error: e.message, pokemon: null, loading: false });
    }
  };

  onNext = async () => {
    const { json } = this.state;
    this.setState({ loading: true });

    try {
      const result = await fetch(json.next);
      const newJson = await result.json();

      this.setState({
        pokemons: newJson.results,
        source: json.next,
        json: newJson,
        loading: false,
      });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  };

  onBack = async () => {
    const { json } = this.state;
    this.setState({ loading: true });

    try {
      const result = await fetch(json.previous);
      const prevJson = await result.json();

      this.setState({
        pokemons: prevJson.results,
        source: json.previous,
        json: prevJson,
        loading: false,
      });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  };

  getPokemon = async (poke) => {
    this.setState({ loading: true });

    try {
      const result = await fetch('https://pokeapi.co/api/v2/pokemon/' + poke);
      const pokeJson = await result.json();

      this.getTypes(pokeJson.types);

      this.setState({ pokemon: pokeJson, loading: false });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  };

  getTypes = (types) => {
    const getTypes = [];

    for (let i = 0; i < types.length; i++) {
      getTypes.push(types[i].type.name);
    }

    this.setState({ types: getTypes });
  };

  flipImg = (img) => {
    if (img) {
      this.setState({ img: false });
    } else {
      this.setState({ img: true });
    }
  };

  render() {
    const { pokemons, error, loading, json, pokemon, types, img } = this.state;

    return (
      <div className="App">
        <Text type="title" className="title">
          <a className="homepage" href="/">
            PokéApp
          </a>
        </Text>
        {!pokemon && (
          <header className="App-header">
            {loading && <Text type="paragraph">loading . . .</Text>}
            {!loading && !error && (
              <>
                <PokemonList
                  pokemons={pokemons}
                  json={json}
                  onClickListItem={this.getPokemon}
                />
                <div className="btn">
                  {json.previous && (
                    <button className="left" onClick={this.onBack}>
                      Prev
                    </button>
                  )}

                  {json.next && (
                    <button className="right" onClick={this.onNext}>
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </header>
        )}
        {pokemon && (
          <div className="App-header">
            {loading && <Text type="paragraph">loading</Text>}
            {!loading && !error && (
              <PokemonInfo
                pokemon={pokemon}
                image={img}
                types={types}
                onClickBack={this.fetchSource}
                flipImg={this.flipImg}
              />
            )}
          </div>
        )}
        {error && !loading && <p>{error}</p>}
      </div>
    );
  }
}

export default App;
