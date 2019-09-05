import React, { Component } from 'react';

import Shelf from '../Shelf';
import FloatCart from '../FloatCart';

class App extends Component {
  render() {
    return (
      
      <React.Fragment>
        <main>
          <div id="shop-title">
            <span>Elastic Swag Shop</span>
          </div>
          <Shelf />
        </main>
        <FloatCart />
      </React.Fragment>
    );
  }
}

export default App;
