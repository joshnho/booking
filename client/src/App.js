import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Pages/Home';
import Login from './Pages/auth/Login';
import Dashboard from './Pages/user/Dashboard';
import DashboardSeller from './Pages/user/DashboardSeller';
import Register from './Pages/auth/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import NewHotel from './hotels/NewHotel';
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
