const authorization = 'bDEyMzQ1Njc4OnAxMjM0NTY3OA==';
const baseUrl = 'http://api-test.tdera.ru/api/RM_CALLCENTRE_SEARCH';

class CatalogApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getCatalogInfo(search) {
    return this._request(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search_string: search }),
    });
  }
}

export const catalogApi = new CatalogApi({
  baseUrl: baseUrl,
});
