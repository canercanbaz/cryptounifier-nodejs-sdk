const BaseAPI = require('./base-api');
const { RequestMethods, Endpoints } = require('./utils');

class MerchantAPI extends BaseAPI {
  constructor(merchantKey, secretKey) {
    const headers = {
      'X-Merchant-Key': merchantKey,
      'X-Secret-Key': secretKey
    };
    super('merchant', headers);
    this.headers = headers;
  }

  /**
   * Get invoice information and it current status. This request will consume 0.1 credits on success and 0.0 on fail.
   * @param {string} invoiceHash Invoice generated hash.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  invoiceInfo(invoiceHash) {
    return this.makeRequest(RequestMethods.GET, Endpoints.Merchant.InvoiceInfo, {
      invoice_hash: invoiceHash
    });
  }

  /**
   * Manually process expired invoices in order to update received amount. This request will consume 0.2 credits on success and 0.1 on fail.
   * @param {object} invoiceHashes Invoice generated hashes list.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  processInvoices(invoiceHashes) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Merchant.ProcessInvoices, {
      invoice_hashes: invoiceHashes
    });
  }

  /**
   * Manually forward invoices funds. This request will consume 0.2 credits on success and 0.1 on fail.
   * @param {object} invoiceHashes Invoice generated hashes list.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  forwardInvoices(invoiceHashes) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Merchant.ForwardInvoices, {
      invoice_hashes: invoiceHashes
    });
  }

  /**
   * Generate invoice address for a specific cryptocurrency. This request will consume 0.1 credits on success and 0.0 on fail.
   * @param {string} invoiceHash Invoice generated hash.
   * @param {string} cryptoCurrency Cryptocurrency symbol, example: ltc.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  generateInvoiceAddress(invoiceHash, cryptoCurrency) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Merchant.GenerateInvoiceAddress, {
      invoice_hash: invoiceHash,
      cryptocurrency: cryptoCurrency
    });
  }

  /**
   * Create an invoice to charge for a product or service. This request will consume 1.0 credits on success and 0.1 on fail.
   * @param {array} cryptoCurrencies Supported cryptocurrencies list, ex: ["btc", "ltc", "eth"].
   * @param {string} currency Invoice currency type, default: usd. (Currently disabled)
   * @param {string} targetValue Invoice currency target value, example: 15.00.
   * @param {string} title Invoice title.
   * @param {string} description Invoice description.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  createInvoice(cryptoCurrencies, currency = null, targetValue = null, title = null, description = null) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Merchant.CreateInvoice, {
      cryptocurrencies: cryptoCurrencies,
      currency,
      target_value: targetValue,
      title,
      description
    });
  }

  /**
   * Estimate invoice price value for multiple cryptocurrencies. This request will consume 0.1 credits on success and 0.0 on fail.
   * @param {array} cryptoCurrencies Supported cryptocurrencies list, ex: ["btc", "ltc", "eth"].
   * @param {string} currency Invoice currency type, default: usd. (Currently disabled)
   * @param {string} targetValue Invoice currency target value, example: 15.00.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  estimateInvoicePrice(cryptoCurrencies, currency = null, targetValue = null) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Merchant.EstimateInvoicePrice, {
      cryptocurrencies: cryptoCurrencies,
      currency,
      target_value: targetValue,
    });
  }

  /**
   * Recover your invoice private key for a specific cryptocurrency. This request will consume 0.1 credits on success and 0.0 on fail.
   * @param {string} invoiceHash Invoice generated hash.
   * @param {string} cryptoCurrency Cryptocurrency symbol, example: ltc.
   * @returns {Promise} Promise object that includes "message" and "credits" properties
   */
  recoverInvoicePrivateKey(invoiceHash, cryptoCurrency) {
    return this.makeRequest(RequestMethods.POST, Endpoints.Merchant.RecoverInvoicePrivateKey, {
      invoice_hash: invoiceHash,
      cryptocurrency: cryptoCurrency
    });
  }
}

module.exports = MerchantAPI;
