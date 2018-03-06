import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { object } from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import NotFound from '../../components/NotFound';
import Home from '../../components/Home';
import { labelRoute, todoRoute } from '../../config/routesConfig';
import LabelRoute from '../../routes/label';
import TodoRoute from '../../routes/todo';
import '../../styles/index.css';

class App extends Component {
  static propTypes = {
    store: object.isRequired,
  }

  render() {
    const { store } = this.props;
    return (
      <Provider {...store}>
        <Router>
          <div>
            <Header />
            <Navigation />
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <LabelRoute path={labelRoute.path} />
              <TodoRoute path={todoRoute.path} />
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
