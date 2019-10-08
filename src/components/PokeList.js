import React from 'react'

function PokeList(props) {
  return (
    <ul>
      {props.pokemon.map((poke) => (
        <li key={poke.name} onClick={() => props.getPoke(poke.name)}>
          {poke.name}
        </li>
      ))}
    </ul>
  )
}

export default PokeList
