const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-3">
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
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>

      <button disabled={!email || !password} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
