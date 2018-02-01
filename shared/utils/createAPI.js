const __HOST__ = 'http://l1669f6515.iok.la/book';

export function createUrl(url) {
  if (url) {
    return `${__HOST__}/${url}`;
  }

  return baseUrl;
}

function fetchRequest(HttpMethod, url, params, options, successCb, errorCb, completeCb) {
  url = createUrl(url);
  wx.request({
    url: url,
    method: HttpMethod,
    data: params,
    header: options,
    success: successCb,
    error: errorCb,
    complete: completeCb
  });
}

export default {
  get(url, params = {}, successCb, errorCb, completeCb) {
    const header = {
      'content-type': 'application/json'
    };
    return fetchRequest('GET', url, params, header, successCb, errorCb, completeCb);
  },
  post(url, params = {}, successCb, errorCb, completeCb) {
    const header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    return fetchRequest('POST', url, params, header, successCb, errorCb, completeCb);
  }
}