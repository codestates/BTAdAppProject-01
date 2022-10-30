import React from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Navbar, Avatar, Link } from "@nextui-org/react";

const Profile = () => {
  const { isConnected, connector } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return isConnected ? (
    <Navbar.Item>
      <Avatar as={Link} href="/my-page"></Avatar>
    </Navbar.Item>
  ) : (
    <Navbar.Link onClick={() => connect({ connector })}>Connect</Navbar.Link>
  );
};

export default Profile;
