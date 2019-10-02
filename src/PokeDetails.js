import React from 'react'

function PokeDetails(props) {
  return (
    <div className='right'>
      {props.pokemon.name} |{props.pokemon.id}
      {props.pokemon.stats.map((stat, index) => (
        <tr key={index}>
          <td className='left'>{stat.stat.name}</td>
          <td className='right'>{stat.base_stat}</td>
        </tr>
      ))}
      {props.types.map((item, index) => (
        <p className='type' key={index}>
          {item}{' '}
        </p>
      ))}
    </div>
  )
}

export default PokeDetails

//  <div className='pokemon'>
//   <div className='row'>
//     <div className='col side left-border top-border'>
//       {img && <img src={pokemon.sprites.front_default} />}
//       {!img && <img src={pokemon.sprites.back_default} />}
//       <button onClick={() => this.flipImg(img)}>flip</button>
//     </div>
//     <div className='col center'>
//       <p id='name'>{pokemon.name}</p>
//     </div>
//     <div
//       className='col side right-border top-border'
//       id='poke-id'
//     >
//       <p>#{pokemon.id}</p>
//     </div>
//   </div>
//   <div className='row left-border right-border'>
//     <div className='col whole'>
//       <p>Type</p>
//       <hr />
//     </div>
//   </div>
//   <div className='row left-border right-border'>
//     <div className='col whole'>
//       {types.map((item, index) => (
//         <p className='type' key={index}>
//           {item}
//         </p>
//       ))}
//     </div>
//   </div>
//   <div className='row left-border right-border bot-border'>
//     <div className='col whole'>
//       <table>
//         <thead>
//           <tr>
//             <th>Stats</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pokemon.stats.map((stat, index) => (
//             <tr key={index}>
//               <td className='left'>{stat.stat.name}</td>
//               <td className='right'>{stat.base_stat}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
// )}
// </div>
