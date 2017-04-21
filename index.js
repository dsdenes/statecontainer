const _ = require('lodash');
const rootStore = {};

const {
  cachedResult
} = require('./units');

function getter(store) {
  return (path, defaultValue) => {
    return (typeof path === 'undefined') ? store : _.get(store, path, defaultValue);
  }
}

function setter(store) {
  return (path, value) => {
    return _.set(store, path, value);
  }
}

function hasChecker(store) {
  return path => {
    return _.has(store, path);
  }
}

function pusher(store) {
  return value => {
    return store.push(value);
  }
}

function storeCreator(store) {
  return (path, initial={}) => {
    if (!_.has(store, path)) {
      _.set(store, path, initial);
    }
    return getSetFactory(_.get(store, path));
  }
}

function getSetFactory(store=rootStore) {
  return Object.freeze({
    store: storeCreator(store),
    get: getter(store),
    set: setter(store),
    has: hasChecker(store),
    push: pusher(store),
    cachedResult: (key, creator, options={}) => cachedResult(getter(store), setter(store), hasChecker(store), key, creator, options)
  });
}

module.exports = getSetFactory;
