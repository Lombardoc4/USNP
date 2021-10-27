import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './Home';
import Dashboard from './components/Dashboard';
import DatabaseTable from './components/DatabaseTable';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInForm from './components/SignInForm';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>

      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
