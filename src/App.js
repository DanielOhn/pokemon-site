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

  flipImg = (img) => {
    if (img) {
      this.setState({ img: false });
    } else {
      this.setState({ img: true });
    }
  }

  render() {
    const { pokemons, error, loading, json, pokemon, types, img } = this.state;

    return (
      <div className="App">
        <h1 className="title"><a className="homepage" href="/">PokéApp</a></h1>
        {!pokemon &&
          <header className="App-header">
          {loading &&
            <p> loading . . . </p>
          }

          {!loading && !error &&
            <div className="row">
              <h3 className="whole underline">
                Pokémans
              </h3>
              <div className="whole pokemon-list">
                <ul>
                 {pokemons.map(poke => (
                   <li className="list" onClick={() => this.getPokemon(poke.name)} key={poke.name}>{poke.name}</li>
                  ))
                  }
                </ul>
              </div>
              <div className="col side"></div>
              <div className="col center">
                {json.previous &&
                  <button className="" onClick={this.onBack}>prev</button>
                } 

                {json.next &&
                  <button className="" onClick={this.onNext}>next</button>
                }   
              </div>
              <div className="col side"></div>
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
                  {img && 
                    <img src={pokemon.sprites.front_default} />
                  }
                  {!img &&
                    <img src={pokemon.sprites.back_default} />
                  }
                  <button onClick={() => this.flipImg(img)}>flip</button>
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
                    <thead>
                      <tr>
                        <th>Stats</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pokemon.stats.map((stat, index) => (
                        <tr key={index}>
                          <td className="left">{stat.stat.name}</td>
                          <td className="right">{stat.base_stat}</td>
                        </tr>                       
                      ))
                      }
                   </tbody>
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

export default App;
