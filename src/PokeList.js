import React from 'react'

function PokeList(props) {
  return (
    <header className='App-header left'>
      <div className='row'>
        <div className='whole pokemon-list'>
          <ul>
            {props.pokemon.map((poke) => (
              <li
                className='list'
                key={poke.name}
                onClick={() => props.getPoke(poke.name)}
              >
                {poke.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default PokeList

//         <div className='btn'>
//           {json.previous && (
//             <button className='left' onClick={this.onBack}>
//               Prev
//             </button>
//           )}

//           {json.next && (
//             <button className='right' onClick={this.onNext}>
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     )}
//   </header>
// )}
