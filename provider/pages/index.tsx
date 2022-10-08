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
          <Text b>Card Title</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button size="sm" light>
              Cancel
            </Button>
            <Button size="sm">Agree</Button>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Home;
