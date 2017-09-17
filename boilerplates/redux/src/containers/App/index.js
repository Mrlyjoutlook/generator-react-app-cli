import React, { Component } from 'react';
import { object } from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import NotFound from '../../components/NotFound';
import Home from '../../components/Home';
import { loginRoute, personalRoute } from '../../config/routesConfig';
import LoginRoute from '../../routes/login';
import PersonalRoute from '../../routes/personal';
import '../../styles/index.css';

class App extends Component {
  static propTypes = {
    // routes: PropTypes.object.isRequired,
    store: object.isRequired,
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Navigation />
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <LoginRoute path={loginRoute.path} store={store} />
              <PersonalRoute path={personalRoute.path} store={store} />
              <Route render={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
