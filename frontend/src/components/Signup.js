import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <section className="signupform">
        <div className="container mt-5 box">
          <h3>Sign Up</h3>
          <div className="signup-component box">
            <form>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="name"
                  autoComplete="off"
                  required
                />
                <label for="name" className="form-label">
                  Name <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  autoComplete="off"
                  required
                />
                <label for="email" className="form-label">
                  Email <i className="zmdi zmdi-email zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="username"
                  autoComplete="off"
                  required
                />
                <label for="username" className="form-label">
                  UserName{" "}
                  <i className="zmdi zmdi-account-circle zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  aria-describedby="contact"
                  autoComplete="off"
                  required
                />
                <label for="contact" className="form-label">
                  Contact <i className="zmdi zmdi-phone-in-talk zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  aria-describedby="gender"
                  autoComplete="off"
                  required
                />
                <label for="gender" className="form-label">
                  Gender <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
                <label for="password" className="form-label">
                  Password <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="confirmpass"
                  required
                />
                <label for="confirmpass" className="form-label">
                  confirm password{" "}
                  <i className="zmdi zmdi-lock-outline zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="box text-center">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
              <button type="submit" className="btn btn-primary">
                SignUp
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
