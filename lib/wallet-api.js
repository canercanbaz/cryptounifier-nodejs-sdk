const BaseAPI = require('./base-api');
const { RequestMethods, Endpoints } = require('./utils');

class WalletAPI extends BaseAPI {
  constructor(walletKey, secretKey, cryptoSymbol) {
    const headers = {
      'X-Wallet-Key': walletKey,
      'X-Secret-Key': secretKey
    }
    super(`wallet/${cryptoSymbol}`, headers);
    this.headers = headers;
  }

  /**
   * Get information about the current state of the cryptocurrency blockchain and the sync percentage from the connected node.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  getBlockchainInfo() {
    return this.makeRequest(RequestMethods.GET, Endpoints.Wallet.BlockchainInfo);
  }

  getTransactionInfo(txId) {
    return this.makeRequest(RequestMethods.GET, Endpoints.Wallet.TransactionInfo, {
      txid: txId
    });
  }

  /**
   * Get the list of cryptocurrency deposit addresses. This request will consume 0.1 credits on success and 0.0 on fail.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  getDepositAddresses() {
    return this.makeRequest(RequestMethods.GET, Endpoints.Wallet.DepositAddresses);
  }

  /**
   * Get confirmed and unconfirmed cryptocurrency balance. This request will consume 0.2 credits on success and 0.0 on fail.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  getBalance() {
    return this.makeRequest(RequestMethods.GET, Endpoints.Wallet.Balance);
  }

  /**
   * Check if an address list is currently valid for selected cryptocurrency. This request will consume 0.1 credits for every address on success and 0.0 on fail.
   * @param {object} addresses Cryptocurrency array addresses list.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  validateAddresses(addresses) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Wallet.ValidateAddresses, {
      addresses
    });
  }

  /**
   * Estimate a final transaction fee and it fee per byte cost. This request will consume 0.1 credits for every destination on success and 0.1 on fail.
   * @param {object} destinations Destinations list, example: {"addr": 0.001, "addr2": 0.001}
   * @param {number} feePerByte Fee per byte value.
   * @param {string} extraField Extra field value.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  estimateFee(destinations, feePerByte = null, extraField = null) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Wallet.EstimateFee, {
      destinations,
      fee_per_byte: feePerByte,
      extra_field: extraField
    });
  }

  /**
   * Create and broadcast a transaction. This request will consume 1.0 credits for every destination on success and 0.1 on fail.
   * @param {object} destinations Destinations list, example: {"addr": 0.001, "addr2": 0.001}
   * @param {number} feePerByte Fee per byte value.
   * @param {string} extraField Extra field value.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  sendTransaction(destinations, feePerByte = null, extraField = null) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Wallet.SendTransaction, {
      destinations,
      fee_per_byte: feePerByte,
      extra_field: extraField
    });
  }
}

module.exports = WalletAPI;
