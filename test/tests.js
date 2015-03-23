var util = require('../.'),
  _ = require('lodash'),
  expect = require('chai').expect;

_.mixin(util);

describe('tests', function () {

  it('mapToHeaders: Throw on empty', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      util.mapToHeaders();
    }).to.throw(Error);
  });

  it('mapToHeaders: Throw on missing headers (need at least one row)', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      util.mapToHeaders([]);
    }).to.throw(Error);
  });

  it('mapToHeaders: Throw on null header', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      util.mapToHeaders([['header1', null, 'header3'], ['a', 'b', 'c']]);
    }).to.throw(Error);
  });

  it('mapToHeaders: Do not throw on false (false is a valid header name)', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      util.mapToHeaders([['header1', false, 'header3'], ['a', 'b', 'c']]);
    }).to.not.throw(Error);
  });

  it('mapToHeaders: Produces expected map when given two basic rows', function () {
    var result = util.mapToHeaders([['a', 'b'], ['c', 'd']]);

    expect(result).to.deep.equal([{a: 'c', b: 'd'}]);
  });

  it('mapToHeaders: Produces expected map when given two basic rows with spaces and capitals in headers', function () {
    var result = util.mapToHeaders([['a a', 'b b B b', 'Aaa Bbb', 'AaaAaa'], ['c c', 'd D', 'eee', '  ']]);

    expect(result).to.deep.equal([{aA: 'c c', bBBB: 'd D', aaaBbb: 'eee', aaaAaa: '  '}]);
  });

  it('indexNamedRows: returns indexed map', function () {
    var result = util.promise('indexBy')('name');

    expect(result([
      {'name': 'a', thing: 'b'},
      {'name': 'c', thing: 'd'}
    ])).to.deep.equal({
      a: {'name': 'a', thing: 'b'},
      c: {'name': 'c', thing: 'd'}
    });
  });

  it('indexNamedRows: returns indexed map', function () {
    var result = util.promise(_.indexBy)('name');

    expect(result([
      {'name': 'a', thing: 'b'},
      {'name': 'c', thing: 'd'}
    ])).to.deep.equal({
        a: {'name': 'a', thing: 'b'},
        c: {'name': 'c', thing: 'd'}
      });
  });

  it('indexNamedRows: returns indexed map', function () {
    var result = _.promise(_.indexBy, 'name');

    expect(result([
      {'name': 'a', thing: 'b'},
      {'name': 'c', thing: 'd'}
    ])).to.deep.equal({
        a: {'name': 'a', thing: 'b'},
        c: {'name': 'c', thing: 'd'}
      });
  });

  it('omitNamedRows: returns map of objects without named property', function () {
    var result = util.promise('omit')('a');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({c: 'd', e: 'f'});
  });

  it('omitNamedRows: returns map of objects without named properties (two arguments)', function () {
    var result = util.promise('omit')('a', 'c');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({e: 'f'});
  });

  it('pickNamedRows: returns map of objects with only named property', function () {
    var result = util.promise('pick')('a');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({a: 'b'});
  });

  it('pickNamedRows: returns map of objects with only named properties (two arguments)', function () {
    var result = util.promise('pick')('a', 'c');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({a: 'b', c: 'd'});
  });

  it('invertKeys: returns map of objects with keys of inner and outer objects reversed', function () {
    var result = util.invertKeys({a: {b: 'c', d: 'e'}, f: {g: 'h', i: 'j'}});

    expect(result).to.deep.equal({b: {a: 'c'}, d: {a: 'e'}, g: {f: 'h'}, i: {f: 'j'}});
  });
});