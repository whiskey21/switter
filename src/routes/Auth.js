import React, { useState } from "react";
import { authService } from "../fbase";
/***
function Auth(){
    return <span>Auth</span>
}

export default Auth;
***/
//this can be changed to

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [newAccount, setAccount] = useState(true);
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
      console.log(error);
      console.log("fucked");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="useremail"
          placeholder="Email"
          required
          value={email}
          onChange={onChange} //because onchange is in here
        ></input>
        <input
          type="password"
          name="userPassword"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        ></input>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log in"}
        ></input>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
