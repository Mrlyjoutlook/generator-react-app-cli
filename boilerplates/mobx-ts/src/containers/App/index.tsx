import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
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

interface Props {
  store: object;
}

class App extends React.Component<Props, {}> {
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
              <Route exact={true} path="/" component={Home} />
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
