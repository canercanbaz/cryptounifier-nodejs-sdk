module.exports.BaseURL = 'https://cryptounifier.io/api/v1';

module.exports.RequestMethods = Object.freeze({
  POST: 'POST',
  GET: 'GET'
});

module.exports.Endpoints = Object.freeze({
  Merchant: {
    InvoiceInfo: 'invoice-info',
    ProcessInvoices: 'process-invoices',
    ForwardInvoices: 'forward-invoices',
    GenerateInvoiceAddress: 'generate-invoice-address',
    CreateInvoice: 'create-invoice',
    EstimateInvoicePrice: 'estimate-invoice-price',
    RecoverInvoicePrivateKey: 'recover-invoice-private-key'
  },
  Wallet: {
    BlockchainInfo: 'blockchain-info',
    TransactionInfo: 'transaction-info',
    DepositAddresses: 'deposit-addresses',
    Balance: 'balance',
    ValidateAddresses: 'validate-addresses',
    EstimateFee: 'estimate-fee',
    SendTransaction: 'send-transaction'
  },
  WalletToken: {
    Balance: 'balance',
    EstimateFee: 'estimate-fee',
    SendTransaction: 'send-transaction'
  }
});
