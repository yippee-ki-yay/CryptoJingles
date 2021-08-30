import Dec from 'decimal.js';

export const isEmptyBytes = (string) => string === '0x0000000000000000000000000000000000000000';

export const requireAddress = (address) => {
  if (typeof address !== 'string') throw new Error('errors.address_is_not_a_string');
  if (address === '') throw new Error('errors.address_is_empty_string');
  if (address.length < 42) throw new Error('errors.address_too_short');
  if (isEmptyBytes(address)) throw new Error('errors.address_is_empty_bytes');
  if (!(new RegExp(/0x[0-9a-fA-F]{40}/).test(address))) throw new Error('errors.invalid_address');
};

/**
 * Mock method to simulate async call
 *
 * @param val {any}
 * @param time {Number}
 * @return {Promise<any>}
 */
export const wait = (time = 500, val = true) => new Promise((resolve) => {
  setTimeout(() => { resolve(val); }, time);
});

export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(-5)}`;

export const numberWithCommas = (x, decimals = 8, removeTrailingZeroes = true) => {
  if (!Number.isFinite(parseFloat(x))) return '0';
  if (parseFloat(x).toString() === '0') return '0';

  const parts = Dec(x).toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let formatted = parts.join('.');
  if (removeTrailingZeroes) {
    formatted = formatted
      .replace(/(\.\d*[1-9])0*$/, '$1') // 123.1200 -> 123.12
      .replace(/\.0*$/, '') // 123.00 -> 123
      .replace(/^0.0+$/, '0'); // 0.00 -> 0
  }
  return formatted;
};

export const formatNumber = (_num, decimals = 2, removeTrailingZeroes = true) => {
  try {
    if (!Number.isFinite(parseFloat(_num))) return '0';
    const sign = parseFloat(_num) < 0 ? '-' : '';
    const num = Math.abs(parseFloat(_num));
    if (num < 10000) return numberWithCommas(_num, decimals, removeTrailingZeroes);

    const si = [
      { value: 1, symbol: '' },
      { value: 1E3, symbol: 'k' },
      { value: 1E6, symbol: 'M' },
      { value: 1E9, symbol: 'B' },
      { value: 1E12, symbol: 'T' },
      { value: 1E15, symbol: 'P' },
      { value: 1E18, symbol: 'E' },
    ];
    let i;

    for (i = si.length - 1; i > 0; i -= 1) {
      if (num >= si[i].value) {
        break;
      }
    }

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    return sign + Dec(num / si[i].value).toFixed(decimals).replace(rx, '$1') + si[i].symbol;
  } catch (e) {
    return _num.toString();
  }
};

export const handleResponse = (response, reload = true) => response.text()
  .then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      console.error(data);
      if (response.status === 401 && reload) {
        console.trace();
        window.location.reload();
      }
      return Promise.reject(new Error(data.error ? (data.error.message || data.error) : data));
    }
    return data;
  });

export const createArrayOfNums = (size) => Array.from(Array(size).keys());

export const isTranslateString = (str) => ((/[\w+]\.[\w+]/gi).test(str)) && (!(/\s+/g).test(str));
