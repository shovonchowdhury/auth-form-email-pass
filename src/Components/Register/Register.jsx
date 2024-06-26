import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../../fitebase/firebase.config";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    console.log(e.target.password.value);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    setRegisterError("");
    setRegisterSuccess(false);

    if (password.length < 6) {
      setRegisterError("Password should contain at least 6 letters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setRegisterError("Password should contain at least one uppercase letter");
      return;
    }

    if (!terms) {
      setRegisterError('You have to accept "Terms & Conditions"');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setRegisterSuccess(true);
        sendEmailVerification(result.user).then(() => {
          alert("Email verification sent!");
        });
      })
      .catch((error) => setRegisterError(error.message));
  };

  return (
    <div className="container mx-auto text-center py-10 bg-gray-400 space-y-5">
      <h2 className="text-4xl ">Please Register!</h2>
      <form onSubmit={handleRegister}>
        <input
          className="w-1/3 rounded-lg p-4"
          type="email"
          name="email"
          placeholder="Enter Email Address"
        />
        <br />
        <br />
        <input
          className="w-1/3 rounded-lg p-4 password-field "
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
        />
        <div
          onClick={() => setShowPass(!showPass)}
          className="text-black icon-pos"
        >
          {showPass ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
        </div>

        <br />
        <input type="checkbox" name="terms" id="tearms" />
        <label htmlFor="terms" className="ml-3">
          Accept terms & conditions
        </label>

        <br />
        <br />
        <input
          className="bg-sky-400 p-3 rounded-lg"
          type="submit"
          value="Register"
        />
      </form>

      <p>
        Already have an account? Please{" "}
        <Link className="text-sky-400" to="/login">
          Login
        </Link>
        .
      </p>

      {registerError && <p className="text-red-500">{registerError}</p>}
      {registerSuccess && (
        <p className="text-green-300">Registered Successfully</p>
      )}
    </div>
  );
};

export default Register;
