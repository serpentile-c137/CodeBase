import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App'

const Login = () => {
  const { state, dispatch } = useContext(UserContext)
  // time(20.19/28.54)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("invalid login credentials");
    } else {
      dispatch({ type: "USER", loggedin: true })
      window.alert("login successful");
      navigate("/");
    }
  };

  return (
    <section className="signupform">
      <center>
        <div className="container mt-5 box">
          <h3>Login</h3>
          <div className="signup-component box my-3">
            <form method="POST" onSubmit={loginUser}>
              <div className="mb-3 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <label for="username" className="form-label">
                  UserName{" "}
                  <i className="zmdi zmdi-account-circle zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <label for="password" className="form-label">
                  Password <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                </label>
              </div>
              <div className="box text-center my-2">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
              <button type="submit" className="btn btn-primary my-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </center>
    </section>
  );
};

export default Login;
