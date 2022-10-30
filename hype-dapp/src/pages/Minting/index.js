import React, { useState } from "react";
import { Container, Row, Col, Text, Card, Grid, Input, Spacer, Textarea, Button } from '@nextui-org/react';
import file_upload from './file_upload.png';
import { uploadJSONToIPFS, uploadFileToIPFS } from "../../pinata";
import { ethers } from "ethers";

const Minting = (props) => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState(false);
  const [metaData, setMetaData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [isListing, setIslisting] = useState(false);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      alert("ONLY JPG & JPEG & PNG FORMAT FILES ARE SUPPORTED");
      return false;
    } else setSelectedImage(file);
  };

  const handleToggle = (event) => {
    setIslisting(event.target.checked);
  };
  const handleMetaData = (event) => {
    const { name, value } = event.target;
    setMetaData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  //Upload Image to IPFS Pinata
  const uploadFIle = async () => {
    try {
      const response = await uploadFileToIPFS(selectedImage);
      if (response.success) {
        return response.pinataURL;
      }
    } catch (error) {
      console.log("error in uploading file");
    }
  };
  //upload MetaData to IPFS
  const uploadMeta = async () => {
    const imageURL = await uploadFIle();
    try {
      const { name, description } = metaData;
      const nftJSON = {
        name,
        description,
        image: imageURL,
      };
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success) {
        return response.pinataURL;
      }
    } catch (error) {
      console.log("error in meta data");
    }
  };

  //Mint the NFT
  const submit = async (event) => {
    event.preventDefault();
    try {
      setOpen(true);
      const metaDataURI = await uploadMeta();
      const _signer = props.web3.provider.getSigner();
      const contractInstance = props.web3.contract.connect(_signer);
      const price = ethers.utils.parseUnits(metaData.price, "ether");
      const listingPrice = await props.web3.contract.getListingPrice();
      const listingAmount = listingPrice.toString();
      const transaction = await contractInstance.createToken(
        metaDataURI,
        price,
        isListing,
        {
          value: listingAmount,
        }
      );
      await transaction.wait();

      setTimeout(() => {
        setMetaData({
          name: "",
          description: "",
          price: "",
        });
        setSelectedImage("");
        setOpen(false);
        setOpenSnack(true);
      }, 2000);
    } catch (error) {
      setError(true);
    }
  };

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
        
        <Grid xs={12}>
          <label for={"file-form"}>
            <br/>
            <br/>
            <img src={file_upload} width="80px" height="80px" alt="drag" />
          </label>
          <Input
            clearable
            bordered
            required
            label="File"
            onChange={handleFile}
            accept=".jpg,.jpeg,.png"
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
            value={metaData.name}
            onChange={handleMetaData}
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
            value={metaData.description}
            onChange={handleMetaData}
            bordered
            color="primary"
            status="default"
            helperColor="primary"
            helperText="Item's detail page underneath its image."
            label="Description"
            placeholder="Description"
            size="lg"
            width="350px"
            required
          />
        </Grid>
        <Spacer y={0.5} />
        <Grid xs={12}>
          <Input
            error={metaData.price === "[0-9]*"}
            value={metaData.price}
            onChange={handleMetaData}
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
        <Button type="submit" color="success" size="lg" >
          Create NFT!
        </Button>
        </Grid>
      </Grid.Container>
    </Container>

  );
};

export default Minting;
