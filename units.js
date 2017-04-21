module.exports = {
  cachedResult
};

function cachedResult(get, set, has, key, creator, {nocache=false, wait=false}) {
  if (nocache || !has(key)) {
    if (wait === true) {
      return Promise.resolve(creator())
        .then(result => set(key, result))
        .then(() => get(key));
    } else {
      set(key, creator());
    }
  }
  return get(key);
}
