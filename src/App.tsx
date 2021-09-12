import React from 'react';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header'

import './styles/global.scss'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/galeria' exact component={Galeria} />
        <Route path='/oficina' exact component={Oficina} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
