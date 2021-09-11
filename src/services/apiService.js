/**
 * Checks if the passed string is a JSON object
 *
 * @param str {String}
 * @return {boolean}
 * @constructor
 */
export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

export const handleResponse = (response) => response.text().then((text) => {
  const data = isJsonString(text) ? JSON.parse(text) : '';

  if (!response.ok) {
    return Promise.reject(new Error(data || text));
  }

  if (response.ok && data.success === false) return Promise.reject(new Error(data.error));

  return data;
});
