const axios = require('axios').default;
const { BaseURL } = require('./utils');

class BaseAPI {
  baseURL = BaseURL;
  client;
  apiKey;
  secretKey;
  suffix;
  headers;

  constructor(suffix, headers) {
    this.suffix = suffix;
    this.headers = headers;
    this.setApiUrl(this.baseURL);
  }

  setApiUrl(apiUrl) {
    this.client = axios.create({ baseURL: `${apiUrl}/${this.suffix}/`, timeout: 5000 });
  }

  async makeRequest(method, uri, body = {}) {
    const options = method === 'POST' ? { data: body } : { params: body };
    const response = await this.client({ url: uri, method, headers: this.headers, ...options });
    return response.data;
  }
}

module.exports = BaseAPI;
