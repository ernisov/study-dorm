export const setItems = (items) => {
  Object.keys(items).forEach((key) => {
    localStorage.setItem(key, items[key]);
  });
};

export const getItems = (keys) => {
  if (Array.isArray(keys)) {
    let result = {};
    keys.forEach(key => {
      result[key] = localStorage.getItem(key);
    });
    return result;
  }
  return typeof keys === 'string' ? localStorage.getItem(keys) : undefined;
};

export const removeItems = (keys) => {
  if (Array.isArray(keys)) {
    return keys.forEach(key => localStorage.removeItem(key));
  }
  localStorage.removeItem(keys);
};

export const hasTokens = () => {
  let tokens = getItems(['accessToken', 'refreshToken']);
  return tokens.accessToken !== undefined && tokens.refreshToken != undefined;
};
