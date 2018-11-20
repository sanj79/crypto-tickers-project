import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Tickers from './containers/Tickers/Tickers';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/crypto/">
        <div className="container-fluid">
          <Layout>
            <Tickers />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
