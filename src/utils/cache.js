const cache = {};

exports.set = (key, value, ttl) => {
  cache[key] = {
    value,
    expiry: Date.now() + ttl,
  };
};

exports.get = (key) => {
  const data = cache[key];
  if (!data) return null;
  if (Date.now() > data.expiry) {
    delete cache[key];
    return null;
  }
  return data.value;
};
