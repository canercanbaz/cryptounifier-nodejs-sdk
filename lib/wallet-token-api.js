const BaseAPI = require('./base-api');
const { RequestMethods, Endpoints } = require('./utils');

class WalletTokenAPI extends BaseAPI {
  constructor(walletKey, secretKey, cryptoSymbol, tokenSymbol) {
    const headers = {
      'X-Wallet-Key': walletKey,
      'X-Secret-Key': secretKey
    };
    super(`wallet/${cryptoSymbol}/token/${tokenSymbol}`, headers);
    this.headers = headers;
  }

  getBalance() {
    return this.makeRequest(RequestMethods.GET, Endpoints.WalletToken.Balance);
  }

  estimateFee(destinations, feePerByte = null, extraField = null) {
    return this.makeRequest(RequestMethods.POST, Endpoints.WalletToken.EstimateFee, {
      destinations,
      fee_per_byte: feePerByte,
      extra_field: extraField
    });
  }

  sendTransaction(destinations, feePerByte = null, extraField = null) {
    return this.makeRequest(RequestMethods.POST, Endpoints.WalletToken.SendTransaction, {
      destinations,
      fee_per_byte: feePerByte,
      extra_field: extraField
    });
  }
}

module.exports = WalletTokenAPI;
