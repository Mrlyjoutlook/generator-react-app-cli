import * as React from 'react';
// import { HashRouter as Router } from 'react-router-dom';  // Route, Switch
import { Provider } from 'react-redux';
import 'normalize.css';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import Navigation from '../../components/Navigation';
// import NotFound from '../../components/NotFound';
// import Home from '../../components/Home';
// import { loginRoute, personalRoute } from '../../config/routesConfig';
// import LoginRoute from '../../routes/login';
// import PersonalRoute from '../../routes/personal';
import '../../styles/index.css';

export interface PropTypes {
  store: any;
}

export interface StateTypes {

}

class App extends React.Component<PropTypes, StateTypes> {

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>aaasaxxx</div>
      </Provider>
    );
  }
}

export default App;

// {/* <Router>
//           <div>
//             <Header />
//             <Navigation />
//             <hr />
//             <Switch>
//               <Route exact path="/" component={Home} />
//               <LoginRoute path={loginRoute.path} store={store} />
//               <PersonalRoute path={personalRoute.path} store={store} />
//               <Route render={NotFound} />
//             </Switch>
//             <Footer />
//           </div>
//         </Router> */}
