const _ = require('lodash');
const rootStore = {};

const {
  cachedResult
} = require('./units');

const getter = store => (path, defaultValue) => {
  return (typeof path === 'undefined') ? store : _.get(store, path, defaultValue);
};
const setter = store => (path, value) =>  _.set(store, path, value);
const haser = store => path =>  _.has(store, path);
const pusher = store => value => store.push(value);

const storeCreator = store => (path, initial={}) => {
  if (!_.has(store, path)) {
    _.set(store, path, initial);
  }
  return getSetFactory(_.get(store, path));
};

function getSetFactory(store=rootStore) {
  return Object.freeze({
    store: storeCreator(store),
    get: getter(store),
    set: setter(store),
    has: haser(store),
    push: pusher(store),
    cachedResult: (key, creator, options={}) => cachedResult(getter(store), setter(store), haser(store), key, creator, options)
  });
}

module.exports = getSetFactory;


