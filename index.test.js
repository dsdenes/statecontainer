const state = require('./index')();

it('Simple get/set should work', () => {
  expect(state.get('t1')).toBe(undefined);
  expect(state.get('t1', 1)).toBe(1);
  state.set('t1', 2);
  expect(state.get('t1')).toBe(2);
  expect(state.get('t1', 1)).toBe(2);
});

it('Push should work with stores', () => {
  const store = state.store('p2', []);
  store.push('v1');
  store.push(123);
  const functionLambda = () => {};
  store.push(functionLambda);
  expect(store.get()).toEqual(['v1', 123, functionLambda]);
  expect(state.get('p2')).toEqual(['v1', 123, functionLambda]);
});

it('One level stores should work', () => {
  const store = state.store('s1');
  expect(store.get('t1')).toBe(undefined);
  expect(state.get('s1.t1')).toBe(undefined);
  expect(store.get('t1', 1)).toBe(1);
  expect(state.get('s1.t1', 1)).toBe(1);
  store.set('t1', 2);
  expect(store.get('t1')).toBe(2);
  expect(state.get('s1.t1')).toBe(2);
  expect(store.get('t1', 1)).toBe(2);
  expect(state.get('s1.t1', 1)).toBe(2);
});

it('Multilevel stores should work', () => {
  const store = state.store('s2.on.multiple.level');
  expect(store.get('t1')).toBe(undefined);
  expect(state.get('s2.on.multiple.level.t1')).toBe(undefined);
  expect(store.get('t1', 1)).toBe(1);
  expect(state.get('s2.on.multiple.level.t1', 1)).toBe(1);
  store.set('t1', 2);
  expect(store.get('t1')).toBe(2);
  expect(state.get('s2.on.multiple.level.t1')).toBe(2);
  expect(store.get('t1', 1)).toBe(2);
  expect(state.get('s2.on.multiple.level.t1', 1)).toBe(2);
});

it('should get store root', () => {
  const store = state.store('s1');
  store.set('t1', 2);
  expect(store.get()).toEqual({t1: 2});
});

