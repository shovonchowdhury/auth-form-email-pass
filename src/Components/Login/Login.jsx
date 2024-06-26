import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import React, { useRef, useState } from "react";
import auth from "../../fitebase/firebase.config";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const forgotPassRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setRegisterError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
        if (!response.user.emailVerified) alert("Please verify your email");
      })
      .catch((error) => setRegisterError(error.message));
  };

  const handleForgotPass = () => {
    const email = forgotPassRef.current.value;

    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("Please put a valid email");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                ref={forgotPassRef}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <label className="label">
                <a
                  onClick={handleForgotPass}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>

            <p>
              New user? Please{" "}
              <Link className="text-blue-500" to="/register">
                Register
              </Link>{" "}
              first.
            </p>
            {registerError && <p className="text-red-500">{registerError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
