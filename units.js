module.exports = {
  cachedResult
};

async function cachedResult(get, set, has, key, creator, {nocache=false, wait=false}) {
  if (nocache || !(await has(key))) {
    if (wait === true) {
      await set(key, await creator());
    } else {
      await set(key, creator());
    }
  }
  return await get(key);
}
