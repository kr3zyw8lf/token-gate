import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Card, Row, Text, Button, Grid, Spacer } from "@nextui-org/react";


const getCollections = (): string[] => {
  return [
    '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    '0x1a92f7381b9f03921564a437210bb9396471050c',
    '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
    '0xe785e82358879f061bc3dcac6f0444462d4b5330',
    '0xedb61f74b0d09b2558f1eeb79b247c1f363ae452',
    '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
    '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d',
    '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
    '0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6',
    '0x7f36182dee28c45de6072a34d29855bae76dbe2f',
    '0x251b5f14a825c537ff788604ea1b58e49b70726f',
    '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    '0xf61f24c2d93bf2de187546b14425bf631f28d6dc',
    '0x23581767a106ae21c074b2276d25e5c3e136a68b',
    '0x572e33ffa523865791ab1c26b42a86ac244df784',
    '0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7',
    '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03'
  ];
};

const AppConnect: NextPage = () => {
  const router = useRouter();
  const { appId } = router.query;
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
          <ul>
            <li>By signing you get let through the token gate if you own a required NFT.</li>
            <li>Warm wallets supported. </li>
            <li>
              Learn more here: <a href="https://warm.xyz/">warm.xyz</a> </li>
             <li>
              App ID: {appId}
            </li> 
            <li>
              Collections: {getCollections().join(', ')}
            </li>             
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

  )

};

export default AppConnect