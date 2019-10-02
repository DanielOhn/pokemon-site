import React, { Component } from 'react'

import PokeList from './PokeList'
import PokeDetails from './PokeDetails'

class App extends Component {
  constructor() {
    super()

    this.state = {
      source: 'https://pokeapi.co/api/v2/pokemon/',
      pokemons: null,
      error: null,
      json: null,
      pokemon: null,
      loading: true,
      poke_load: true,
      types: null,
      img: true,
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

  onNext = async () => {
    const { json } = this.state
    this.setState({ loading: true })

    try {
      const result = await fetch(json.next)
      const newJson = await result.json()

      this.setState({
        pokemons: newJson.results,
        source: json.next,
        json: newJson,
        loading: false,
      })
    } catch (e) {
      this.setState({ error: e.message, loading: false })
    }
  }

  onBack = async () => {
    const { json } = this.state
    this.setState({ loading: true })

    try {
      const result = await fetch(json.previous)
      const prevJson = await result.json()

      this.setState({
        pokemons: prevJson.results,
        source: json.previous,
        json: prevJson,
        loading: false,
      })
    } catch (e) {
      this.setState({ error: e.message, loading: false })
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

  flipImg = (img) => {
    if (img) {
      this.setState({ img: false })
    } else {
      this.setState({ img: true })
    }
  }

  render() {
    const {
      pokemons,
      error,
      loading,
      poke_load,
      json,
      pokemon,
      types,
      img,
    } = this.state

    return (
      <div className='App'>
        <h1 className='title'>
          <a className='homepage' href='/'>
            PokéApp
          </a>
        </h1>
        {loading && <p> Loading ... </p>}

        {!loading && !error && (
          <PokeList pokemon={pokemons} getPoke={this.getPokemon} />
        )}

        {pokemon && (
          <div className='App-header'>
            {poke_load && <p>loading</p>}

            {!poke_load && !error && (
              <PokeDetails pokemon={pokemon} types={types} />
            )}
          </div>
        )}
        {error && !loading && <p>{error}</p>}
      </div>
    )
  }
}

export default App
