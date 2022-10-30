import React, { useState } from "react";
import { Container, Row, Col, Text, Card, Grid, Input, Spacer, Textarea, Button } from '@nextui-org/react';
import file_upload from './file_upload.png';
import { uploadJSONToIPFS, uploadFileToIPFS } from "../../pinata";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { API_KEY, API_TEST_KEY } from "../../constants/const";
import { Network, Alchemy } from "alchemy-sdk";


const Minting = (props) => {
  const { address, isConnected } = useAccount();
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
    <Container xl>
      <Grid.Container gap={1} justify="center">
        <Spacer y={1.0} />
        <Grid xs={12} justify="center">
          <Text h1>Create NFT</Text>
        </Grid>
        <Spacer y={1.5} />
      </Grid.Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={4} justify="left"></Grid>
        <Grid xs={8} justify="left">
          <Text h4 color="primary">File</Text>
        </Grid>
        <Grid xs={12} justify="center">
          <label for={"file-form"}>
            <img src={file_upload} width="80px" height="80px" alt="nft" />
          </label>
          <Input
            clearable
            required
            onChange={handleFile}
            accept=".jpg,.jpeg,.png"
            id="file-form"
            type="file"
            style={{ display:"none" }}
            size="lg"
          />
        </Grid>
        <Grid xs={4} justify="center"></Grid>
        <Grid xs={8} justify="left">
          <Text size="$xs" color="error">* File types supported: JPG, JPEG, PNG.</Text>
        </Grid>
        <Spacer y={0.5} />
        <Grid xs={12} justify="center">
          <Input
            value={metaData.name}
            onChange={handleMetaData}
            clearable
            bordered
            required
            label={<Text h4 color="primary">Name</Text>}
            type="text"
            placeholder="NFT Name"
            size="lg"
            width="400px"
          />
        </Grid>
        <Spacer y={1.0} />
        <Grid xs={12} justify="center">
          <Textarea
            value={metaData.description}
            onChange={handleMetaData}
            bordered
            status="default"
            helperColor="primary"
            helperText="Item's detail page underneath its image."
            label={<Text h4 color="primary">Description</Text>}
            placeholder="NFT Description"
            size="lg"
            width="400px"
            required
          />
        </Grid>
        <Spacer y={1.0} />
        <Grid xs={12} justify="center">
          <Input
            error={metaData.price === "[0-9]*"}
            value={metaData.price}
            onChange={handleMetaData}
            clearable
            bordered
            required
            label={<Text h4 color="primary">Price</Text>}
            type="number"
            placeholder="Price in ETH"
            size="lg"
            width="400px"
            labelRight="ETH"
          />
        </Grid>
        <Spacer y={1.5} />
        <Grid xs={12} justify="center">
          <Button type="submit" onClick={submit} color="primary" size="lg">
            Create NFT!
          </Button>
        </Grid>
      </Grid.Container>
    </Container>

  );
};

export default Minting;
