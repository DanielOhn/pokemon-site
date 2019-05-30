import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      source: "https://pokeapi.co/api/v2/pokemon/",
      pokemons: null,
      error: null,
      json: null,
      pokemon: null,
      loading: true,
      types: null,
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

      this.setState({ pokemon: null, types: null, pokemons: output.results, json: output, loading: false });
    } catch (e) {
      this.setState({ error: e.message, pokemon: null, loading: false });
    }
  }

  onNext = async () => {
    const { json } = this.state;
    this.setState({ loading: true });

    try {
      const result = await fetch(json.next);
      const newJson = await result.json();

      this.setState({ pokemons: newJson.results, source: json.next, json: newJson, loading: false})
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  }

  onBack = async () => {
    const { json } = this.state;
    this.setState({ loading: true });

    try {
      const result = await fetch(json.previous);
      const prevJson = await result.json();

      this.setState({ pokemons: prevJson.results, source: json.previous, json: prevJson, loading: false})
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  }

  getPokemon = async (poke) => {
    this.setState({ loading: true });

    try {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon/" + poke);
      const pokeJson = await result.json();

      console.log(pokeJson);

      this.getTypes(pokeJson.types);

      this.setState({ pokemon: pokeJson, loading: false })
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  }

  getTypes = (types) => {
    const getTypes = [];

    for (let i = 0; i < types.length; i++) {
      getTypes.push(types[i].type.name);
    }

    this.setState({ types: getTypes })
  }

  render() {
    const { pokemons, error, loading, json, pokemon, types } = this.state;

    return (
      <div className="App">
        <h1 className="title"><a className="homepage" href="/">PokéApp</a></h1>
        {!pokemon &&
        <header className="App-header">
          {loading &&
            <p> loading . . . </p>
          }

          {!loading && !error &&
            <div className="container">
              { pokemons.map(poke => (
                  <div className="pokemon-list" key={poke.name}>
                    <a onClick={() => this.getPokemon(poke.name)}>{poke.name}</a>
                  </div>
                ))
               }
               {json.previous &&
                <button onClick={this.onBack}>prev</button>
               }
               {json.next &&
                <button onClick={this.onNext}>next</button>
               }
            </div>
          }          
        </header>
      }
      {pokemon &&
        <div className="App-header">
          {loading && 
            <p>loading</p>
          }

          {!loading && !error &&
            <div className="pokemon">
              <div className="row">
                <div className="col side left-border top-border">
                  <img src={pokemon.sprites.front_default} />
                </div>
                <div className="col center">
                  <p id="name">{ pokemon.name }</p>
                </div>
                <div className="col side right-border top-border" id="poke-id">
                  <p>#{pokemon.id}</p>
                </div>
              </div>
              <div className="row left-border right-border">
                <div className="col whole">
                  <p>Type</p><hr />
                </div>
              </div>
              <div className="row left-border right-border">
                <div className="col whole">
                  {types.map((item, index) => (
                    <p className="type" key={index}>{item}</p>
                ))}
                </div>
    
              </div>
              <div className="row left-border right-border bot-border">
  
                <div className="col whole">
                  <table>
                    <tr>
                      Stats
                    </tr>
                  
                    {pokemon.stats.map((stat, index) => (
                      <tr>
                        <td className="left">{stat.stat.name}</td>
                        <td className="right">{stat.base_stat}</td>
                      </tr>
                    ))
                    }
                  </table>
                </div>
               
              </div>
              <button className="return" onClick={this.fetchSource}>return</button>
            </div>
          }
        </div>
      }
      {error && !loading &&
        <p>{ error }</p>
      }   
      </div>
    );
  }
}

// const Pokemon 

export default App;
