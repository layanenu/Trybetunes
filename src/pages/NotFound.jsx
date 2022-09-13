import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h2>
          Ops!
        </h2>
        <p>A página que você está procurando não foi encontrada.</p>
      </div>
    );
  }
}

export default NotFound;
