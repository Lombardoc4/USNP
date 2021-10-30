import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import Dashboard from './components/Dashboard/Dashboard';
// import { store } from './app/store';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.scss';
import DatabaseTable from './components/DatabaseTable';
import FarmTable from './components/FarmTable';

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <Router>
        <Switch>

          <Route exact path={"/"} component={Landing} />
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/find-plants" component={DatabaseTable}/>
          <Route path="/my-plants" component={DatabaseTable}  user="true" />
          <Route path="/find-farms" component={FarmTable}/>
          <Route path="/my-farms" component={routeProps => (
              <FarmTable {...routeProps} user="true" />
          )}/>
        </Switch>

      </Router>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
