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
