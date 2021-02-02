import storeBuddy from '../dist/index';

describe('store-buddy Persistent class', () => {
  beforeEach(() => localStorage.clear());

  test('it stores to localStorage', () => {
    storeBuddy('foo', 'hello world');
    expect(localStorage.getItem('foo')).not.toBeNull();
  });

  test('it can store a value of every type', () => {
    expect(() => {
      storeBuddy('bar', 'hello');
      localStorage.getItem('bar');

      storeBuddy('bar', 123);
      localStorage.getItem('bar');

      storeBuddy('bar', true);
      localStorage.getItem('bar');

      storeBuddy('bar', {});
      localStorage.getItem('bar');
    }).not.toThrow();
  });

  describe('methods', () => {
    test('load', () => {
      expect(storeBuddy('test', 'hello').load()).toBe('hello');
      expect(storeBuddy('test', 123).load()).toBe(123);
      expect(storeBuddy('test', true).load()).toBe(true);
      expect(storeBuddy('test', {}).load()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(storeBuddy('test', obj).load()).toEqual(obj);

      const a = storeBuddy('test', 'hello');
      localStorage.removeItem('test');
      expect(a.load()).toBeNull();
    });

    test('save', () => {
      const a = storeBuddy('test1', '');
      a.save('hello');
      expect(localStorage.getItem('test1')).toBe(JSON.stringify('hello'));

      const b = storeBuddy('test2', 123);
      b.save(456);
      expect(localStorage.getItem('test2')).toBe(JSON.stringify(456));

      const c = storeBuddy('test3', true);
      c.save(false);
      expect(localStorage.getItem('test3')).toBe(JSON.stringify(false));

      const d = storeBuddy('test4', {});
      d.save({ foo: 'bar' });
      expect(localStorage.getItem('test4')).toBe(
        JSON.stringify({ foo: 'bar' })
      );
    });

    test('clear', () => {
      expect(localStorage.getItem('test')).toBeNull();
      storeBuddy('test', 'hello').clear();
      expect(localStorage.getItem('test')).toBeNull();
    });
  });
});

describe('store-buddy Session class', () => {
  beforeEach(() => sessionStorage.clear());

  test('it stores to sessionStorage', () => {
    storeBuddy('foo', 'hello world', true);
    expect(sessionStorage.getItem('foo')).not.toBeNull();
  });

  test('it can store a value of every type', () => {
    expect(() => {
      storeBuddy('bar', 'hello', true);
      sessionStorage.getItem('bar');

      storeBuddy('bar', 123, true);
      sessionStorage.getItem('bar');

      storeBuddy('bar', true, true);
      sessionStorage.getItem('bar');

      storeBuddy('bar', {}, true);
      sessionStorage.getItem('bar');
    }).not.toThrow();
  });

  describe('methods', () => {
    test('load', () => {
      expect(storeBuddy('test', 'hello', true).load()).toBe('hello');
      expect(storeBuddy('test', 123, true).load()).toBe(123);
      expect(storeBuddy('test', true, true).load()).toBe(true);
      expect(storeBuddy('test', {}, true).load()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(storeBuddy('test', obj, true).load()).toEqual(obj);

      const a = storeBuddy('test', 'hello', true);
      sessionStorage.removeItem('test');
      expect(a.load()).toBeNull();
    });

    test('save', () => {
      const a = storeBuddy('test1', '', true);
      a.save('hello');
      expect(sessionStorage.getItem('test1')).toBe(JSON.stringify('hello'));

      const b = storeBuddy('test2', 123, true);
      b.save(456);
      expect(sessionStorage.getItem('test2')).toBe(JSON.stringify(456));

      const c = storeBuddy('test3', true, true);
      c.save(false);
      expect(sessionStorage.getItem('test3')).toBe(JSON.stringify(false));

      const d = storeBuddy('test4', {}, true);
      d.save({ foo: 'bar' });
      expect(sessionStorage.getItem('test4')).toBe(
        JSON.stringify({ foo: 'bar' })
      );
    });

    test('clear', () => {
      expect(sessionStorage.getItem('test')).toBeNull();
      storeBuddy('test', 'hello', true).clear();
      expect(sessionStorage.getItem('test')).toBeNull();
    });
  });
});
