import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const inputStyles = {};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [newAccount, setAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    //target goes to <input>form
    const {
      target: { name, value },
    } = event;
    if (name === "useremail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
        //create account
      } else {
        await authService.signInWithEmailAndPassword(email, password);
        //log in
      }
    } catch (error) {
      setError(error.message);
      console.log("check out auth");
    }
  };
  const setToggle = () => {
    setAccount((potato) => !potato);
  };
  const onClickSocial = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
      //get google
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
      //get github
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmit} className="container">
        <input
          type="text"
          name="useremail"
          placeholder="Email"
          required
          value={email}
          onChange={onChange} //because onchange is in here
          className="authInput"
        ></input>
        <input
          type="password"
          name="userPassword"
          placeholder="Password"
          required
          value={password}
          className="authInput"
          onChange={onChange}
        ></input>
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Log in"}
        ></input>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={setToggle} className="authSwitch">
        {newAccount ? "Sign in" : "Create Account"}
        {console.log(newAccount)}
      </span>
      <div className="authBtns">
        <button onClick={onClickSocial} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onClickSocial} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
