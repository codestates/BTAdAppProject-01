import React, { useState, useEffect } from "react";
import { Container, Card, Avatar, Button } from "@nextui-org/react";
import { useAccount } from "wagmi";
import { API_KEY, API_TEST_KEY } from "../../constants/const";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: API_TEST_KEY,
  network: Network.ETH_GOERLI,
};

const MyPage = () => {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    const alchemy = new Alchemy(settings);
    alchemy.nft.getNftsForOwner(address).then((res) => setNfts(res));
  }, [address]);

  return (
    <Container>
      {isConnected ? (
        <>
          <Avatar size="xl"></Avatar>
          {address}
          <Card>
            <Card.Header>
              <Button.Group color="gradient">
                <Button>NFT</Button>
                <Button>History</Button>
              </Button.Group>
            </Card.Header>
            <Card.Body>
              {nfts && nfts.totalCount === 0 ? "No items to display" : ""}
            </Card.Body>
          </Card>{" "}
        </>
      ) : (
        <Card>
          <Card.Body>지갑을 연결해주세요.</Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MyPage;
