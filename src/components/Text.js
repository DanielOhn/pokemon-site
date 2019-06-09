import React from 'react';

function Text({ type, children, ...props }) {
  let Tag;
  switch (type) {
    case 'title':
      Tag = <h1 {...props}>{children}</h1>;
      break;
    case 'subtitle':
      Tag = <h3 {...props}>{children}</h3>;
      break;
    case 'paragraph':
      Tag = <p {...props}>{children}</p>;
      break;
  }
  return Tag;
}

Text.defaultProps = {
  type: 'title',
};

export default Text;
