import { Grid, Card, Text, Image,Container, Row, Col , Link ,Spacer } from "@nextui-org/react";
import React, { useState } from "react";
const { Alchemy, Network }  =  require('alchemy-sdk');  

export default function Explorer() {
    const [data, updateData] = useState(null);
    const settings = {
      apiKey: "ftkztgirdO2MUDVaNfSMgnpt3fsettuE", //Bf4B07mteq--hhpOBkKlrtP5g5-3tzHg",
      network: Network.ETH_MAINNET,
    };
    let nftimage;
    let nftname;
    let nfttokenType;
    let nfttokenId;
    let nftdescription;
    let nftaddress;
    const omitMetadata = false;
    const alchemy = new Alchemy(settings); 
    function getAllNFTs() {
    const response  = alchemy.nft.getNftsForContract("0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb", {
        omitMetadata: false,
      });
    var transaction = JSON.stringify(response, null, 2);
    const obj = JSON.parse(transaction);

    for(var i = 0; i < obj.nfts.length; i++) 
    {
        nftimage = obj.nfts[i].rawMetadata.image;
        nftname =  obj.nfts[i].rawMetadata.name;
        nfttokenType = obj.nfts[i].tokenType;
        nfttokenId = obj.nfts[i].tokenId;
        nftdescription = obj.nfts[i].description;
        nftaddress = obj.nfts[i].contract.address;
    }
    //getAllNFTs();
    }
    return (
        <Container>
            <Card css={{ $$cardColor: '$colors$primary' }}>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Image align="left"
                                width={320}
                                height={180}  
                                src="https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5"
                                alt="Default Image"
                                objectFit="cover" />
                        <Text h6 size={15} color="white" css={{ m: 5 }}>
                        <p>name: NFT#1</p>
                        <p>description: Alchemy's First NFT</p>
                        <p>price: 0.03ETH </p>
                        <p>currentlySelling: True</p>
                        <p>address: 0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13 </p>
                        </Text>
                    </Row>
                </Card.Body>
            </Card>
            <Spacer y={1} />
            <Card css={{ $$cardColor: '$colors$primary' }}>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Image
                            width={320}
                            height={180}  
                            src="https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M"
                            alt="Default Image"
                            objectFit="cover"/>

                        <Text h6 size={15} color="white" css={{ m: 5 }}>
                        <p>name :  NFT#2 </p>
                        <p>description : Alchemy's Second NFT </p>
                        <p>price : 0.03ETH </p>
                        <p>currentlySelling : True  </p> 
                        <p>address : 0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13  </p>
                        </Text>
        
                    </Row>
                </Card.Body>
            </Card>
        </Container> 
);   
}


