import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });
      console.log('REGISTER USER ==> ', res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter Name"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Enter Email"
          value={email}
          onChange={handleChange}
        />

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default RegisterForm;
