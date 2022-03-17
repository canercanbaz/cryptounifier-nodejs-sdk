const nock = require('nock');

const { WalletAPI } = require('../lib/cryptounifier');
const { BaseURL, Endpoints } = require('../lib/utils');

describe('WalletAPI', () => {
  let client;

  beforeAll(() => {
    client = new WalletAPI('walletKey', 'secretKey', 'btc');
  });

  it(`should return information about the current state of the cryptocurrency blockchain -> ${Endpoints.Wallet.BlockchainInfo}`, async () => {
    const scope = nock(BaseURL)
      .get(uri => uri.includes(Endpoints.Wallet.BlockchainInfo))
      .reply(200, {
        message: {
          chain: "main",
          blocks: 2115908,
          difficulty: 10736625.30086128,
          sync_percentage: 100
        },
        credits: {
          consumed: 0.1,
          remaining_balance: 129.9
        }
      });

    const response = await client.getBlockchainInfo();
    expect(response.message).toEqual(
      expect.objectContaining({
        chain: "main",
        blocks: 2115908,
        difficulty: 10736625.30086128,
        sync_percentage: 100
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

  it(`should return the list of cryptocurrency deposit addresses -> ${Endpoints.Wallet.DepositAddresses}`, async () => {
    const scope = nock(BaseURL)
      .get(uri => uri.includes(Endpoints.Wallet.DepositAddresses))
      .reply(200, {
        message: [
          "ltc1qxy308dyd7gec362pcn97h3r84fhxc8cdy2cu4v",
          "MNxU85LxJzmcVYbtff3FHJdvwCVaKnSmpT",
          "LPhmF7pcK9a2tBNi5qMfX5WrqzH8vwsFWB"
        ],
        credits: {
          consumed: 0.1,
          remaining_balance: 129.9
        }
      });

    const response = await client.getDepositAddresses();
    expect(response.message).toEqual(
      expect.arrayContaining([
        "ltc1qxy308dyd7gec362pcn97h3r84fhxc8cdy2cu4v",
        "MNxU85LxJzmcVYbtff3FHJdvwCVaKnSmpT",
        "LPhmF7pcK9a2tBNi5qMfX5WrqzH8vwsFWB"
      ]),
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.1,
        remaining_balance: 129.9
      }),
    );
    scope.done();
  });

  it(`should return confirmed and unconfirmed cryptocurrency balance -> ${Endpoints.Wallet.Balance}`, async () => {
    const scope = nock(BaseURL)
      .get(uri => uri.includes(Endpoints.Wallet.Balance))
      .reply(200, {
        message: {
          confirmed: "0.03251075",
          unconfirmed: "0.00000000",
          total: "0.03251075"
        },
        credits: {
          consumed: 0.1,
          remaining_balance: 129.9
        }
      });

    const response = await client.getBalance();
    expect(response.message).toEqual(
      expect.objectContaining({
        confirmed: "0.03251075",
        unconfirmed: "0.00000000",
        total: "0.03251075"
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

  it(`should check if an address list is currently valid for selected cryptocurrency -> ${Endpoints.Wallet.ValidateAddresses}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Wallet.ValidateAddresses))
      .reply(200, {
        message: {
          "ltc1qlg82tjnc6qthaypfgzuazuqnpuhhc7xykux7cn": true,
          "bitcoincash:qp3473vgrs5ylaagrpzxh07y5032hghezs0nspmt0p": false,
          "0xd2de7e8f69a2493ef2269e78170268a18d9804d6": false
        },
        credits: {
          consumed: 0.3,
          remaining_balance: 129.7
        }
      });

    const response = await client.validateAddresses(['address1', 'address2', 'address3']);
    expect(response.message).toEqual(
      expect.objectContaining({
        "ltc1qlg82tjnc6qthaypfgzuazuqnpuhhc7xykux7cn": true,
        "bitcoincash:qp3473vgrs5ylaagrpzxh07y5032hghezs0nspmt0p": false,
        "0xd2de7e8f69a2493ef2269e78170268a18d9804d6": false
      }),
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.3,
        remaining_balance: 129.7
      }),
    );
    scope.done();
  });

  it(`should estimate a final transaction fee and it fee per byte cost -> ${Endpoints.Wallet.EstimateFee}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Wallet.EstimateFee))
      .reply(200, {
        message: {
          final: "0.00001000",
          per_byte: "0.00000002"
        },
        credits: {
          consumed: 0.2,
          remaining_balance: 129.8
        }
      });

    const response = await client.estimateFee({ "addr": 0.001, "addr2": 0.001 }, 1, 'extraField');
    expect(response.message).toEqual(
      expect.objectContaining({
        final: "0.00001000",
        per_byte: "0.00000002"
      }),
    );
    expect(response.credits).toEqual(
      expect.objectContaining({
        consumed: 0.2,
        remaining_balance: 129.8
      }),
    );
    scope.done();
  });

  it(`should create and broadcast a transaction -> ${Endpoints.Wallet.SendTransaction}`, async () => {
    const scope = nock(BaseURL)
      .post(uri => uri.includes(Endpoints.Wallet.SendTransaction))
      .reply(200, {
        message: {
          amount: "0.00100000",
          fee: "0.00001000",
          txid: "88b8a2bf34fc884fe132e30c238e8d1b1204c33d6085730997018eb489befdf6",
          destinations: {
            "ltc1qlg82tjnc6qthaypfgzuazuqnpuhhc7xykux7cn": "0.00100000"
          },
          created_at: "2021-09-02T06:33:15.000000Z"
        },
        credits: {
          consumed: 1,
          remaining_balance: 129
        }
      });

    const response = await client.sendTransaction({ "addr": 0.001, "addr2": 0.001 }, 1, 'extraField');
    expect(response.message).toEqual(
      expect.objectContaining({
        amount: "0.00100000",
        fee: "0.00001000",
        txid: "88b8a2bf34fc884fe132e30c238e8d1b1204c33d6085730997018eb489befdf6",
        destinations: {
          "ltc1qlg82tjnc6qthaypfgzuazuqnpuhhc7xykux7cn": "0.00100000"
        },
        created_at: "2021-09-02T06:33:15.000000Z"
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
});
