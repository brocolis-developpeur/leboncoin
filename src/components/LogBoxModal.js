import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const login = async (email, password, loginOK, unshowmodal) => {
  try {
    const response = await axios.post(
      "https://leboncoin-api.herokuapp.com/api/user/log_in",
      {
        email: email, //farid@lereacteur.io
        password: password //azerty
      }
    );
    let user = response.data.account.username;
    loginOK(user);
    unshowmodal();
  } catch {
    alert("Authent Error");
  }
};

const LogBoxModal = props => {
  const history = useHistory();
  const { loginOK, unshowmodal } = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <>
      <div className="blackbox" onClick={unshowmodal}></div>
      <div className="formlogbox">
        <form
          onSubmit={event => {
            event.preventDefault();
            login(email, password, loginOK, unshowmodal);
          }}
        >
          connexion
          <hr></hr>
          <input
            placeholder="email"
            value={email}
            type="text"
            onChange={event => {
              setEmail(event.target.value);
            }}
          ></input>
          <input
            placeholder="password"
            type="text"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
          ></input>
          <input type="submit" value="Se connecter" />
        </form>

        <button
          onClick={() => {
            unshowmodal();
            history.push("/signup");
          }}
        >
          Creer un compte
        </button>
        {/* <Link to="/signup">Sign Up Link</Link> */}
      </div>
    </>
  );
};
export default LogBoxModal;