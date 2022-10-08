import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container, Card, Row, Text, Button, Grid, Spacer } from "@nextui-org/react";



const Home: NextPage = () => {
  return (
    <Container
      fluid
      css={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card css={{ mw: "330px" }}>
        <Card.Header>
          <Text b>Welcome to Warm Token Gate</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <ul>
            <li>By signing you get let through the token gate if you own a required NFT.</li>
            <li>Warm wallets supported. </li> 
            <li>
              Learn more here: <a href="https://warm.xyz/">warm.xyz</a> </li>
            <li>This is a hackathon project. Only deployed for testing purposes. </li>
          </ul>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button size="sm" light>
              Cancel
            </Button>
            <Button size="sm">Sign</Button>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Home;
