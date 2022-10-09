import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Card, Row, Text, Button, Grid, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import { fetchJson } from "ethers/lib/utils";
import * as models from '../models';


declare global {
  interface Window {
    ethereum?: any;
  }
}

const AppConnect: NextPage = () => {
  const router = useRouter();
  const { appId } = router.query;

  // const [state, setState] = useState<State>("NotConnected");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<models.Nft[] | null>(null);

  useEffect(() => {
    if (walletAddress) {
      const reload = () => {
        window.location.reload();
      }
      window.ethereum?.on('accountsChanged', reload);

      return () => {
        window.ethereum?.removeListener('accountsChanged', reload);
      };
    }
  }, [walletAddress]);



  const connect = async () => {
    console.log("Connect");
    const accounts = await window.ethereum?.request<string[]>({ method: 'eth_accounts' });
    if (accounts?.length === 1) {
      if (typeof accounts[0] === 'string') {
        console.log(accounts[0]);
        setWalletAddress(accounts[0]);
      }
    }
  };

  const sign = async () => {
    console.log("Sign");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const message = `Sign this message to prove token ownership. \nNonce: ${uuidv4().toString()}`
    const signature = await signer.signMessage(message);
    console.log(signature);
    // Post to server
    const response = await fetchJson('/api/tokens-owned',
      JSON.stringify({
        signature,
        message,
        walletAddress,
      })
    );

    if (response.nfts) {
      setNfts(response.nfts);
    }
    else {
      setNfts(null);
    }
  };

  const actionButton = (() => {
    if (walletAddress) {
      return <Button size="sm" onPress={sign}>Sign</Button>;
    }
    return <Button size="sm" onPress={connect}>Connect</Button>;
  })()

  const body = (() => {

    if (nfts) {
      console.log(nfts);
      return (
        <div>
          <ul>
            <li>Select NFT to use in the token gate</li>
          </ul>
          <Grid.Container gap={2} justify="flex-start">

            {nfts.map((item, index) => {

              let imageSrc = (item.media.find(element => element.thumbnail))?.thumbnail ?? item.media.find(element => element.gateway)?.gateway ?? "";

              return (
                <Grid xs={6} sm={3} key={index}>

                  <Card isPressable>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={imageSrc}
                        objectFit="cover"
                        width="100%"
                        height={140}
                        alt={item.title}
                      />
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: "flex-start" }}>
                      <Row wrap="wrap" justify="space-between" align="center">
                        <Text b>{item.title}</Text>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>

              )
            })}

          </Grid.Container>

        </div>
      );
    }

    if (walletAddress) {
      return (
        <ul>
          <li>Sign a message with the hot wallet to prove token ownership</li>
        </ul>
      );
    }

    return (
      <ul>
        <li>This is a hackathon project. Only deployed for testing purposes. </li>
        <li>This service will prove you own a specific NFT to get you through a token gate.</li>
        <li>Warm wallets supported. </li>
        <li>Learn more here: <a href="https://warm.xyz/">warm.xyz</a> </li>
        <li>Connect to get started</li>
      </ul>
    );
  })();

  return (

    <Container
      fluid
      css={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Card css={{ mw: "800px" }}>
        <Card.Header>
          <Text b>Welcome to Warm Token Gate</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          {body}
        </Card.Body>
        <Card.Divider />
        {!nfts && (
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm" light>
                Cancel
              </Button>
              {actionButton}
            </Row>
          </Card.Footer>

        )}
      </Card>


    </Container>

  )

};

export default AppConnect
