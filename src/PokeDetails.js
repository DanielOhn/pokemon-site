import React, { Fragment } from 'react'

function PokeDetails(props) {
  return (
    <Fragment>
      <div className='poke-left'>
        <img
          src={props.pokemon.sprites.front_default}
          alt={props.pokemon.name}
        />
        <br />
        <small>No. {props.pokemon.id}</small>
      </div>
      <div className='poke-right'>
        <h2>{props.pokemon.name}</h2>
        {props.types.map((item, index) => (
          <h3 key={index}>{item}</h3>
        ))}
        <h3>HT: {props.pokemon.height}</h3>
        <h3>WT: {props.pokemon.weight}</h3>
      </div>
      <div className='poke-bottom'>
        <table>
          <tr>
            <th className='left'>Base Stats</th>
            <th className='right'>Value</th>
          </tr>
          {props.pokemon.stats.reverse().map((stat, index) => (
            <tr key={index}>
              <td className='left'>{stat.stat.name}</td>
              <td className='right'>{stat.base_stat}</td>
            </tr>
          ))}
        </table>
      </div>
    </Fragment>
  )
}

export default PokeDetails

// Height: Decimeters
// Weight: Hectograms
