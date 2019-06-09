import React from 'react';
import List from './List';
import Text from './Text';

function PokemonList({ pokemons, onClickListItem }) {
  return (
    <div className="row">
      <Text type="subtitle" className="whole underline">
        Pokémans
      </Text>
      <div className="whole pokemon-list">
        <List data={pokemons} onClick={onClickListItem} />
      </div>
    </div>
  );
}

export default PokemonList;
