import React, { Component } from 'react'

import PokeList from './PokeList'
import PokeDetails from './PokeDetails'

// https://pokeapi.co/api/v2/pokemon/?limit=897
// https://pokeapi.co/api/v2/pokemon/

class App extends Component {
  constructor() {
    super()

    this.state = {
      source: 'https://pokeapi.co/api/v2/pokemon/?limit=897/',
      pokemons: null,
      error: null,
      json: null,
      pokemon: null,
      loading: true,
      poke_load: true,
      types: null,
    }
  }

  componentDidMount() {
    this.fetchSource()
  }

  fetchSource = async () => {
    const { source } = this.state

    this.setState({ loading: true })

    try {
      const result = await fetch(source)
      const output = await result.json()

      this.setState({
        pokemon: null,
        types: null,
        pokemons: output.results,
        json: output,
        loading: false,
      })
    } catch (e) {
      this.setState({ error: e.message, pokemon: null, loading: false })
    }
  }

  getPokemon = async (poke) => {
    this.setState({ poke_load: true })

    try {
      const result = await fetch('https://pokeapi.co/api/v2/pokemon/' + poke)
      const pokeJson = await result.json()

      this.getTypes(pokeJson.types)

      this.setState({ pokemon: pokeJson, poke_load: false })
    } catch (e) {
      this.setState({ error: e.message, poke_load: false })
    }
  }

  getTypes = (types) => {
    const getTypes = []

    for (let i = 0; i < types.length; i++) {
      getTypes.push(types[i].type.name)
    }

    this.setState({ types: getTypes })
  }

  render() {
    const { pokemons, error, loading, poke_load, pokemon, types } = this.state

    return (
      <div className='container'>
        <div className='content'>
          <div className='pokemon-list'>
            <div className='pokedex'>
              <small>Pokedex</small>

              <small>v 0.01</small>
            </div>
            {loading && <p> Loading ... </p>}

            {!loading && !error && (
              <PokeList pokemon={pokemons} getPoke={this.getPokemon} />
            )}
          </div>

          {pokemon && (
            <div className='pokemon-detail'>
              {poke_load && <p>loading..</p>}

              {!poke_load && !error && (
                <PokeDetails pokemon={pokemon} types={types} />
              )}
            </div>
          )}
          {error && !loading && <p>{error}</p>}
        </div>
      </div>
    )
  }
}

export default App
