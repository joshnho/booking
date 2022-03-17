import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/Pages/Home';
import Login from './components/Pages/auth/Login';
import Dashboard from './components/Pages/user/Dashboard';
import DashboardSeller from './components/Pages/user/DashboardSeller';
import Register from './components/Pages/auth/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import NewHotel from './components/hotels/NewHotel';
import StripeCallback from './stripe/StripeCallback';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={1500}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
