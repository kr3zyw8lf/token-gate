# Token-Gate

Have a game and want to unlock a special item for bored ape holders, but don't want to get into the implementation details of query for NFT ownership, integrating with wallets and juggling multiple hot and cold wallets? 

Token-gating is a common mechanism that restricts access to products, content or functionality to owners of specific NFTS. The purpose of this project is to provide a 3rd party service that will implement gating for your website or app.

Additionally, users are very wary of scams and are hesitant to connect random sites to their metamask or wallet. By having a centralized site that multiple apps can use there's less stress and friction that arises from linking yet another site to their wallet.

[<img src="https://img.youtube.com/vi/NpsGaJzwzKU/maxresdefault.jpg" width="50%">](https://youtu.be/NpsGaJzwzKU)

Go to the demo app:
https://token-gate-demo-app.vercel.app/

Go to the provider:
https://token-gate-provider.vercel.app/


This project uses metamask to verify the user owns the wallet.
[warm.xyz](https://warm.xyz) is used to see what cold wallets are linked with the current wallet they're using so that if they have a high valued NFT like a bored ape on a separate hardware wallet, then their hot wallet can act on its behalf. Infura and alchemy is used to query the warm smart contract.
To query for nft ownership alchemy is used.