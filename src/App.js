import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  const [user, setUser] = useState(null);
  const menu = [
    { title: "home", link: "/" },
    { title: "chat", link: "/chat" },
  ];
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/verifyuser", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    verifyUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar menu={menu} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/chat/:room_id/:room_name" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
