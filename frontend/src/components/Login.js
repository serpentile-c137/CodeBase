import React from "react";
import { Link } from "react-router-dom";


const Login = () => {
    return (
        <section className="signupform">
            <div className="container mt-5 box">
                <h3>Login</h3>
                <div className="signup-component box">
                    <form>
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
                                type="password"
                                className="form-control"
                                id="password"
                                required
                            />
                            <label for="password" className="form-label">
                                Password <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                            </label>
                        </div>
                        <div className="box text-center">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login