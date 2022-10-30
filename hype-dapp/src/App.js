import React from "react";
import { Navbar, Text, Link } from "@nextui-org/react";
import Explorer from "./pages/Explorer";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Minting from "./pages/Minting";
import { Routes, Route } from "react-router-dom";
import { getDefaultProvider } from "ethers";
import { WagmiConfig, createClient } from "wagmi";
import Profile from "./components/Profile";
import { ethers } from "ethers";
// import nftstoreABI from "../contract/contracts/NFTMarketplace.sol/NFTMarketplace.json";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function App() {
  return (
    <div className="App">
      <WagmiConfig client={client}>
        <Navbar>
          <Navbar.Brand>
            <Text as={Link} href="/">
              hypedApp
            </Text>
          </Navbar.Brand>
          <Navbar.Content>
            <Navbar.Link href="/explorer">Marketplace</Navbar.Link>
            <Navbar.Link href="/minting">Create</Navbar.Link>

            <Profile />
          </Navbar.Content>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/minting" element={<Minting />} />
          <Route path="/my-page" element={<MyPage />} />
        </Routes>
      </WagmiConfig>
    </div>
  );
}

export default App;
