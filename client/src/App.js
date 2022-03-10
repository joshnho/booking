import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Home exact path="/" component={Home} />
        <Login path="/login" component={Login} />
        <Register path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
