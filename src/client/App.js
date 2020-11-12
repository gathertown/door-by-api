import React, { useState } from 'react';
import axios from 'axios';

const App = (props) => {
  const [status, setStatus] = useState(null);

  const submitPassword = (password) => {
    axios.get('/api/submitPassword', {
      params: {
        password: password,
      }
    })
      .then(res => {
        console.log(setStatus(res.data.status));
        window.localStorage.setItem("submission", password);
      })
  }

  let defaultVal = window.localStorage.getItem("submission") ? window.localStorage.getItem("submission") : null;

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20vh"}}>
      <div style={{maxWidth: "600px", textAlign: "center"}}>
        <h1>Welcome to the Gather office!</h1>
        <div>If you're here to see someone, click on their name in the participants list, and "chat" them and tell them to come get you!</div>
        <br />
        <br />
        <br />
        <div>Otherwise, if you have the password, enter it here:</div>
        <input placeholder="Super secret password" id="password" type="password" defaultValue={defaultVal}></input>
        <button onClick={(e) => submitPassword(document.getElementById("password").value)}>Submit</button>
        { status ? <div>{status}</div> : null }
      </div>
    </div>
  );
}

export default App;