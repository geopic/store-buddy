import storeBuddy from '../dist/index';

describe('store-buddy Persistent class', () => {
  beforeEach(() => localStorage.clear());

  test('it stores to localStorage', () => {
    storeBuddy('foo').save('hello world');
    expect(localStorage.getItem('foo')).not.toBeNull();
  });

  test('it can store a value of every type', () => {
    expect(() => {
      storeBuddy<string>('bar').save('hello');
      localStorage.getItem('bar');

      storeBuddy<number>('bar').save(123);
      localStorage.getItem('bar');

      storeBuddy<boolean>('bar').save(true);
      localStorage.getItem('bar');

      storeBuddy<object>('bar').save({});
      localStorage.getItem('bar');
    }).not.toThrow();
  });

  describe('methods (excl. save)', () => {
    test('load', () => {
      expect(storeBuddy('test').save('hello').load()).toBe('hello');
      expect(storeBuddy('test').save(123).load()).toBe(123);
      expect(storeBuddy('test').save(true).load()).toBe(true);
      expect(storeBuddy('test').save({}).load()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(storeBuddy('test').save(obj).load()).toEqual(obj);

      const a = storeBuddy('test').save('hello');
      localStorage.removeItem('test');
      expect(a.load()).toBeNull();
    });

    test('clear', () => {
      expect(localStorage.getItem('test')).toBeNull();
      storeBuddy('test').save('hello').clear();
      expect(localStorage.getItem('test')).toBeNull();
    });
  });
});

describe('store-buddy Session class', () => {
  beforeEach(() => sessionStorage.clear());

  test('it stores to sessionStorage', () => {
    storeBuddy('foo', true).save('hello world');
    expect(sessionStorage.getItem('foo')).not.toBeNull();
  });

  test('it can store a value of every type', () => {
    expect(() => {
      storeBuddy<string>('bar', true).save('hello');
      sessionStorage.getItem('bar');

      storeBuddy<number>('bar', true).save(123);
      sessionStorage.getItem('bar');

      storeBuddy<boolean>('bar', true).save(true);
      sessionStorage.getItem('bar');

      storeBuddy<object>('bar', true).save({});
      sessionStorage.getItem('bar');
    }).not.toThrow();
  });

  describe('methods (excl. save)', () => {
    test('load', () => {
      expect(storeBuddy('test', true).save('hello').load()).toBe('hello');
      expect(storeBuddy('test', true).save(123).load()).toBe(123);
      expect(storeBuddy('test', true).save(true).load()).toBe(true);
      expect(storeBuddy('test', true).save({}).load()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(storeBuddy('test', true).save(obj).load()).toEqual(obj);

      const a = storeBuddy('test', true).save('hello');
      sessionStorage.removeItem('test');
      expect(a.load()).toBeNull();
    });

    test('clear', () => {
      expect(sessionStorage.getItem('test')).toBeNull();
      storeBuddy('test', true).save('hello').clear();
      expect(sessionStorage.getItem('test')).toBeNull();
    });
  });
});
