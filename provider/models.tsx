
export type Attribute = {
  "value": string; // "Green Blue Circles",
  "trait_type": string; // "Background"
}

export type Media = {
  "raw": string; // "ipfs://QmUm88NJATnAxu5cEHP2Nun2mh2RYfeS1cAfWqLqbNB4rM",
  "gateway": string; // "https://res.cloudinary.com/alchemyapi/image/upload/mainnet/7da2e99755cbded232c6f8e57ff0f1db.png",
  "thumbnail": string; // "https://res.cloudinary.com/alchemyapi/image/upload/w_256,h_256/mainnet/7da2e99755cbded232c6f8e57ff0f1db.png",
  "format": string; // "png",
  "bytes": number; // 126088
}

export type Nft = {
  "contract": {
    "address": string; // "0xf61f24c2d93bf2de187546b14425bf631f28d6dc",
    "name": string; // "World Of Women Galaxy",
    "symbol": string; // "WOWG",
    "totalSupply": string; // "21404",
    "tokenType": string; // "ERC721"
  },
  "tokenId": string; //  "22033",
  "tokenType": string; //  "ERC721",
  "title": string; //  "WoWG #22033",
  "description": string; //  "",
  "timeLastUpdated": string; //  "2022-10-08T05:26:37.655Z",
  "rawMetadata": {
    "name": string; // "WoWG #22033",
    "image": string; // "ipfs://QmUm88NJATnAxu5cEHP2Nun2mh2RYfeS1cAfWqLqbNB4rM",
    "attributes": Attribute[]
  },
  "tokenUri": {
    "raw": string; // "https://qm5fuyzuoxfb-wowg-prod.s3.amazonaws.com/t/22033",
    "gateway": string; // "https://qm5fuyzuoxfb-wowg-prod.s3.amazonaws.com/t/22033"
  },
  "media": Media[]
}