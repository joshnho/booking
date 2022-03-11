import { useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('SEND LOGIN DATA', { email, password });
    try {
      const res = await login({ email, password });
      if (res.data) {
        window.localStorage.setItem('auth', JSON.stringify(res.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: res.data,
        });
        toast.success(`Welcome, ${res.data.user.name}!`);
        history.push('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed');
      console.log(error);
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
