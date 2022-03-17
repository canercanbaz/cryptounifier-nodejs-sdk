const nock = require('nock');

const { MerchantAPI } = require('../lib/cryptounifier');
const { BaseURL, Endpoints } = require('../lib/utils');

describe('MerchantAPI', () => {
  let client;

  beforeAll(() => {
    client = new MerchantAPI('merchantKey', 'secretKey');
  });

  it(`should return invoice information and its current status -> ${Endpoints.Merchant.InvoiceInfo}`, async () => {
    const scope = nock(BaseURL)
      .get(uri => uri.includes(Endpoints.Merchant.InvoiceInfo))
      .reply(200, {
        message: {
          title: "New Invoice",
          status: 0,
        },
        credits: {
          consumed: 0.1,
          remaining_balance: 129.9
        }
      });

    const response = await client.invoiceInfo('invoiceHash');
    expect(response.message).toEqual(
      expect.objectContaining({
        title: "New Invoice",
        status: 0,
      }),
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.1,
        remaining_balance: 129.9
      }),
    );
    scope.done();
  });

  it(`should manually process expired invoices in order to update received amount -> ${Endpoints.Merchant.ProcessInvoices}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Merchant.ProcessInvoices))
      .reply(200, {
        message: [{
          title: "New Invoice",
          status: 0,
        }],
        credits: {
          consumed: 0.2,
          remaining_balance: 129.8
        }
      });

    const response = await client.processInvoices(['hash1', 'hash2']);
    expect(response.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "New Invoice" }),
      ])
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.2,
        remaining_balance: 129.8
      }),
    );
    scope.done();
  });

  it(`should manually forward invoices funds -> ${Endpoints.Merchant.ForwardInvoices}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Merchant.ForwardInvoices))
      .reply(200, {
        message: [{
          title: "New Invoice",
          status: 0,
        }],
        credits: {
          consumed: 0.2,
          remaining_balance: 129.8
        }
      });

    const response = await client.forwardInvoices(['hash1', 'hash2']);
    expect(response.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "New Invoice",
          status: 0,
        }),
      ])
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.2,
        remaining_balance: 129.8
      }),
    );
    scope.done();
  });

  it(`should generate invoice address for a specific cryptocurrency -> ${Endpoints.Merchant.GenerateInvoiceAddress}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Merchant.GenerateInvoiceAddress))
      .reply(200, {
        message: [{
          title: "New Invoice",
          status: 0,
        }],
        credits: {
          consumed: 0.2,
          remaining_balance: 129.8
        }
      });

    const response = await client.generateInvoiceAddress('hash', 'btc');
    expect(response.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "New Invoice",
          status: 0,
        }),
      ])
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.2,
        remaining_balance: 129.8
      }),
    );
    scope.done();
  });

  it(`should create an invoice to charge for a product or service -> ${Endpoints.Merchant.CreateInvoice}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Merchant.CreateInvoice))
      .reply(200, {
        message: {
          title: "New Invoice",
          status: 0,
        },
        credits: {
          consumed: 1,
          remaining_balance: 129
        }
      });

    const response = await client.createInvoice(['btc', 'ltc', 'etc'], 'usd', '15.00', 'title', 'description');
    expect(response.message).toEqual(
      expect.objectContaining({
        title: "New Invoice",
        status: 0,
      }),
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 1,
        remaining_balance: 129
      }),
    );
    scope.done();
  });

  it(`should estimate invoice price value for multiple cryptocurrencies -> ${Endpoints.Merchant.EstimateInvoicePrice}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Merchant.EstimateInvoicePrice))
      .reply(200, {
        message: [
          {
            symbol: "btc",
            target_amount: "0.00030676",
            quotation: "48898.000000"
          },
        ],
        credits: {
          consumed: 0.1,
          remaining_balance: 129.9
        }
      });

    const response = await client.estimateInvoicePrice(['btc'], 'usd', '15.00');
    expect(response.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          symbol: 'btc',
          target_amount: '0.00030676',
          quotation: '48898.000000'
        }),
      ])
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.1,
        remaining_balance: 129.9
      }),
    );
    scope.done();
  });

  it(`should recover your invoice private key for a specific cryptocurrency -> ${Endpoints.Merchant.RecoverInvoicePrivateKey}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Merchant.RecoverInvoicePrivateKey))
      .reply(200, {
        message: 'INVOICE_PRIVATE_KEY',
        credits: {
          consumed: 0.1,
          remaining_balance: 129.8
        }
      });

    const response = await client.recoverInvoicePrivateKey('hash', 'btc');
    expect(typeof response.message).toEqual('string');
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.1,
        remaining_balance: 129.8
      }),
    );
    scope.done();
  });
});
