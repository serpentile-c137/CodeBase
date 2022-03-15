import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   username: "",
  //   contact: "",
  //   password: "",
  //   confirmpass: "",
  // });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  let navigate = useNavigate();

  // let name, value;
  // const handleInputs = (e) => {
  //   console.log(e)
  //   name = e.target.name;
  //   value = e.target.value;

  //   setUser({ ...user, [name]: value });
  // }

  const PostData = async (e) => {
    e.preventDefault();
    // const { name, email, username, contact, password, confirmpass } = user
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        contact,
        password,
        confirmpass,
      }),
    });
    console.log(name, email, username, contact, password, confirmpass);
    const data = await res.json();
    console.log(data);

    if (data.status === 422 || !data) {
      window.alert("Invalid data");
      console.log("invalid data");
    } else {
      window.alert("registration successful");
      console.log("registration successful");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="signupform container mt-5 box">
        <center>
          <div className="container mt-5 box">
            <h4>Sign Up</h4>
            <div className="signup-component box my-3">
              <form method="POST" onSubmit={PostData}>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="name"
                    autoComplete="off"
                    value={name}
                    // onChange={(e) => setUser(e.target.value)}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
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
                    type="text"
                    className="form-control"
                    id="contact"
                    aria-describedby="contact"
                    autoComplete="off"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                    required
                  />
                  <label for="contact" className="form-label">
                    Contact{" "}
                    <i className="zmdi zmdi-phone-in-talk zmdi-hc-lg"></i>
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
                <div className="mb-3 form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpass"
                    value={confirmpass}
                    onChange={(e) => {
                      setConfirmpass(e.target.value);
                    }}
                    required
                  />
                  <label for="confirmpass" className="form-label">
                    confirm password{" "}
                    <i className="zmdi zmdi-lock-outline zmdi-hc-lg"></i>
                  </label>
                </div>
                <div className="box text-center my-2">
                  Already have an account? <Link to="/login">Log In</Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary my-2"
                  // onClick={PostData}
                >
                  SignUp
                </button>
              </form>
            </div>
          </div>
        </center>
      </section>
    </>
  );
};

export default Signup;
