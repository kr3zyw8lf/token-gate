// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Network, Alchemy, OwnedBaseNftsResponse, OwnedNft } from 'alchemy-sdk';
import { utils } from "ethers";
import warm from '../../warm.json';
import { ethers } from "ethers";

const getCollections = (appId: string): string[] => {
  // TODO: Make configure by project
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

type Request = {
  message: string;
  signature: string;
  walletAddress: string;  
};

type ResponseOK = {
  ok: true;
  nfts: OwnedNft[];
}

type ResponseError = {
  ok: false,
  message: string;
}

type ResponseData = ResponseOK | ResponseError;

const {
INFURA_ID,
ALCHEMY_API_KEY,
PRIVATE_KEY,
} = process.env;

if (
  !INFURA_ID ||
  !ALCHEMY_API_KEY ||
  !PRIVATE_KEY
) {
  throw new Error("Invalid configuration")
}

const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const getColdWallets = async (walletAddress: string) => {

  const alchemyProvider = new ethers.providers.AlchemyProvider("mainnet", ALCHEMY_API_KEY);

  const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

  // Get all the NFTs owned by an address
  const CONTRACT_ADDRESS = '0xc3aa9bc72bd623168860a1e5c6a4530d3d80456c';
  const contract = new ethers.Contract(CONTRACT_ADDRESS, warm, signer);
  const coldWallets = await contract.getColdWallets(walletAddress) as string[]; 
  return coldWallets;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const {
    message,
    signature,
    walletAddress,
  } = req.body as Request;

  if (!message || !signature || !walletAddress) {
    res.status(200).json({ ok: false, message: "Invalid parameters" });
    return;
  }

  const verification = utils.verifyMessage(message, signature);

  if (walletAddress.toLowerCase() !== verification.toLocaleLowerCase()) {
    res.status(200).json({ ok: false, message: "Invalid signature" });
    return;
  }

  const contractAddresses = getCollections('1');
  const wallets = [walletAddress, ...(await getColdWallets(walletAddress))];
  let allNfts: OwnedNft[] = [];
  for (const wallet of wallets) {
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress, {
      contractAddresses,
      omitMetadata: false,        
    });  
    allNfts = [...allNfts, ...nfts.ownedNfts];
  }

  console.log(JSON.stringify(allNfts, null, 2));  

  res.status(200).json({ ok: true, nfts: allNfts });
}
