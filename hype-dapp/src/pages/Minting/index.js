import React, { useState } from "react";
import { Container, Row, Col, Text, Card, Grid, Input, Spacer, Textarea, Button } from '@nextui-org/react';
// import file_upload from './file_upload.png';
import { ethers } from "ethers"
// import { create as ipfsHttpClient } from 'ipfs-http-client'

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const client = ("");

const Minting = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
    
  const uploadToIPFS = async (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      if (typeof file !== 'undefined') {
          try {
              const result = await client.add(file)
              console.log(result)
              setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
          } catch (error) {
              console.log("ipfs image upload error: ", error)
          }
      }
  }
  const createNFT = async () => {
      if (!image || !price || !name || !description) return
      try {
          const result = await client.add(JSON.stringify({ image, name, description }))
          mintThenList(result)
      } catch (error) {
          console.log("ipfs uri upload error: ", error)
      }
  }
  const mintThenList = async (result) => {
      const uri = `https://ipfs.infura.io/ipfs/${result.path}`
      //mint nft
      await (await nft.mint(uri)).wait()
      //get tokenId of new nft
      const id = await nft.tokenCount()
      //approve marketplace to spend nft
      await (await nft.setApprovalForAll(marketplace.address, true)).wait()
      //add nft to marketplace
      const listeningPrice = ethers.utils.parseEther(price.toString())
      await (await marketplace.makeItem(nft.address, id, listeningPrice)).wait()
  }

  return (
    // <div className="container-fluid mt-5">
    //   <div className="row">
    //     <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
    //       <div className="content mx-auto">
    //         <Row className="g-4">
    //           <Form.Control
    //             type="file"
    //             required
    //             name="file"
    //             onChange={uploadToIPFS}
    //           />
    //           <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
    //           <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
    //           <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
    //           <div className="d-grid px-0">
    //             <Button onClick={createNFT} variant="primary" size="lg">
    //               Create & List NFT!
    //             </Button>
    //           </div>
    //         </Row>
    //       </div>
    //     </main>
    //   </div>
    // </div>

    <Container xl>
      <Grid.Container gap={3} justify="center">
        {/* <Grid xs={12}>
          <Input
            clearable
            bordered
            required
            label="Url"
            type="url"
            size="lg" 
          />
        </Grid>
        <Spacer y={0.5} /> */}
        <Grid xs={12}>
          <label for={"file-form"}>
            <br/>
            {/* <br/>
            <img src={file_upload} width="80px" height="80px" alt="drag" /> */}
          </label>
          <Input
            clearable
            bordered
            required
            label="File"
            // onChange={uploadToIPFS}
            id="file-form"
            type="file"
            style={{ display:"none" }}
            size="lg"
            width="350px"
            color="primary"
          />
        </Grid>
        <Spacer y={0.5} />
        <Grid xs={12}>
          <Input
            onChange={(e) => setName(e.target.value)}
            clearable
            bordered
            required
            label="NFT Name"
            type="text"
            placeholder="NFT Name"
            size="lg"
            width="350px"
            color="primary"
          />
        </Grid>
        <Spacer y={0.5} />
        <Grid xs={12}>
          <Textarea
            bordered
            color="primary"
            status="default"
            helperColor="primary"
            helperText="Item's detail page underneath its image."
            label="Description"
            placeholder="Description"
            size="lg"
            width="350px"
            // onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Spacer y={0.5} />
        <Grid xs={12}>
          <Input
            // onChange={(e) => setPrice(e.target.value)}
            clearable
            bordered
            required
            label="Price"
            type="number"
            placeholder="Price in ETH"
            size="lg"
            width="350px"
            color="primary"
            labelRight="ETH"
          />
        </Grid>
        <Spacer y={0.5} />
        <Grid>
        <Button onClick={createNFT} color="success" size="lg" >
          Create NFT!
        </Button>
        </Grid>
      </Grid.Container>
    </Container>

  );
};

export default Minting;
