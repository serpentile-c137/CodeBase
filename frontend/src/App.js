import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    console.log("clicked");
    const response = fetch("http://localhost:3001/api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        username,
        password,
      }),
    });

    const data = (await response).json;
    console.log(data);
  }

  return (
    <div className="App">
      <h3>register</h3>
      <form action="" onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="UserName"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        {/* <input type="text" placeholder="Enter your name" id="" />
        <input type="text" placeholder="Enter your password" id="" />
        <input type="text" placeholder="Enter your name" id="" /> */}
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
