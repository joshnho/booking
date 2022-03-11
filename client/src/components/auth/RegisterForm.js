const RegisterForm = ({
  name,
  setName,
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
