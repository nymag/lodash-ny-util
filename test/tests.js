var util = require('../.'),
  expect = require('chai').expect;

describe('tests', function () {

  it('omitNamedRows: returns map of objects without named property', function () {
    var result = util.omitNamedRows('a');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({c: 'd', e: 'f'});
  });

  it('omitNamedRows: returns map of objects without named properties (two arguments)', function () {
    var result = util.omitNamedRows('a', 'c');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({e: 'f'});
  });

  it('pickNamedRows: returns map of objects with only named property', function () {
    var result = util.pickNamedRows('a');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({a: 'b'});
  });

  it('pickNamedRows: returns map of objects with only named properties (two arguments)', function () {
    var result = util.pickNamedRows('a', 'c');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({a: 'b', c: 'd'});
  });

  it('invertKeys: returns map of objects with keys of inner and outer objects reversed', function () {
    var result = util.invertKeys({a: {b: 'c', d: 'e'}, f: {g: 'h', i: 'j'}});

    expect(result).to.deep.equal({b: {a: 'c'}, d: {a: 'e'}, g: {f: 'h'}, i: {f: 'j'}});
  });
});