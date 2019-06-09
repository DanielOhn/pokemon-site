import React from 'react';

function List({ data, onClick }) {
  return (
    <ul>
      {data.map((item) => (
        <li className="list" onClick={() => onClick(item.name)} key={item.name}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default List;
