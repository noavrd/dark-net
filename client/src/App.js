import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import Home from './components/Home';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

function App() {
  const [allPastes, setAllPastes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  return (
    <div className="App">
      <NavBar
        setAllPastes={setAllPastes}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setError={setError}
      />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            children={
              <Home
                allPastes={allPastes}
                setAllPastes={setAllPastes}
                error={error}
                setError={setError}
              />
            }
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
