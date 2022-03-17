# CryptoUnifier Node.js SDK

A simple Node.js SDK for interacting with [Crypto Unifier](https://cryptounifier.io) API V1.

## Installation

You can install the package via NPM:

```bash
npm install @cryptounifier/nodejs-sdk
```

## Usage

### Using the Wallet API client

You can use the `WalletAPI` class for convenient access to API methods. Some are defined in the code:

```javascript
const { WalletAPI } = require("@cryptounifier/nodejs-sdk");

const client = new WalletAPI("WALLET_KEY", "SECRET_KEY", "btc");

const balance = await client.getBalance();
console.log(balance);

const depositAddresses = await client.getDepositAddresses();
console.log(depositAddresses);
```

### Using the Merchant API client

You can use the `MerchantAPI` class for convenient access to API methods. Some are defined in the code:

```javascript
const { MerchantAPI } = require("@cryptounifier/nodejs-sdk");

const client = new MerchantAPI("MERCHANT_KEY", "SECRET_KEY");

const invoice = await client.createInvoice(["btc", "bch", "eth"]);
console.log(invoice);
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
