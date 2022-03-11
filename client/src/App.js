import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Pages/Home';
import Login from './Pages/auth/Login';
import Dashboard from './Pages/user/Dashboard';
import DashboardSeller from './Pages/user/DashboardSeller';
import Register from './Pages/auth/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

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
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/dashboard/seller" component={DashboardSeller} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
