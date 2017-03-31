const {
  cachedResult
} = require('./units');
//
// async function cachedResult(get, set, has, key, creator, {nocache, wait=true}) {

it('should save result without resolving creator promise', async () => {
  const get = jest.fn();
  const set = jest.fn();
  const has = jest.fn();
  const create = jest.fn(async () => 2);
  await cachedResult(get, set, has, 'key', create, {wait: false});
  expect(has).toHaveBeenCalledTimes(1);
  expect(get).toHaveBeenCalledTimes(1);
  expect(set).toHaveBeenCalledTimes(1);
  expect(create).toHaveBeenCalledTimes(1);
  expect(set).toBeCalledWith('key', expect.any(Promise));
});

it('should save result with resolving creator promise', async () => {
  const get = jest.fn();
  const set = jest.fn();
  const has = jest.fn();
  const create = jest.fn(async () => 2);
  await cachedResult(get, set, has, 'key', create, {wait: true});
  expect(has).toHaveBeenCalledTimes(1);
  expect(get).toHaveBeenCalledTimes(1);
  expect(set).toHaveBeenCalledTimes(1);
  expect(create).toHaveBeenCalledTimes(1);
  expect(set).toBeCalledWith('key', 2);
});

it('should return if there is a cached value', async () => {
  const get = jest.fn();
  const set = jest.fn();
  const has = jest.fn(() => true);
  const create = jest.fn(async () => 2);
  await cachedResult(get, set, has, 'key', create, {wait: true});
  expect(has).toHaveBeenCalledTimes(1);
  expect(get).toHaveBeenCalledTimes(1);
  expect(set).toHaveBeenCalledTimes(0);
  expect(create).toHaveBeenCalledTimes(0);
});

it('should force recreation is nocache is true', async () => {
  const get = jest.fn();
  const set = jest.fn();
  const has = jest.fn(() => true);
  const create = jest.fn(async () => 2);
  await cachedResult(get, set, has, 'key', create, {wait: true, nocache:true});
  expect(has).toHaveBeenCalledTimes(0);
  expect(get).toHaveBeenCalledTimes(1);
  expect(set).toHaveBeenCalledTimes(1);
  expect(create).toHaveBeenCalledTimes(1);
  expect(set).toBeCalledWith('key', 2);
});

