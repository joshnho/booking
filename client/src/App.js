import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Pages/Home';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import Navbar from './components/Navbar';

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
        <Home exact path="/" component={Home} />
        <Login path="/login" component={Login} />
        <Register path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
