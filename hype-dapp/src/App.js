import React from "react";
import { Navbar, Text, Avatar, Link } from "@nextui-org/react";
import Explorer from "./pages/Explorer";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Minting from "./pages/Minting";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand>
          <Text as={Link} href="/">
            hypedApp
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link href="/#">Connect</Navbar.Link>
          <Navbar.Link href="/explorer">Marketplace</Navbar.Link>
          <Navbar.Link href="/minting">Create</Navbar.Link>
          <Navbar.Item>
            <Avatar as={Link} href="/my-page"></Avatar>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/my-page" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
