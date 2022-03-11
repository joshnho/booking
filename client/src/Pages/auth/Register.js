import RegisterForm from '../../components/auth/RegisterForm';

export const Register = () => {
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
