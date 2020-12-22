import sb from '../dist/index';

describe('store-buddy Persistent class', () => {
  beforeEach(() => localStorage.clear());

  test('it stores to localStorage', () => {
    new sb.Persistent('foo', 'hello world');
    expect(localStorage.getItem('foo')).not.toBeNull();
  });

  test('it can store a value of every type', () => {
    expect(() => {
      new sb.Persistent('bar', 'hello');
      localStorage.getItem('bar');

      new sb.Persistent('bar', 123);
      localStorage.getItem('bar');

      new sb.Persistent('bar', true);
      localStorage.getItem('bar');

      new sb.Persistent('bar', {});
      localStorage.getItem('bar');
    }).not.toThrow();
  });

  describe('methods', () => {
    test('get', () => {
      expect(new sb.Persistent('test', 'hello').get()).toBe('hello');
      expect(new sb.Persistent('test', 123).get()).toBe(123);
      expect(new sb.Persistent('test', true).get()).toBe(true);
      expect(new sb.Persistent('test', {}).get()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(new sb.Persistent('test', obj).get()).toEqual(obj);

      const a = new sb.Persistent('test', 'hello');
      localStorage.removeItem('test');
      expect(a.get()).toBeNull();
    });

    test('set', () => {
      const a = new sb.Persistent('test1', '');
      a.set('hello');
      expect(localStorage.getItem('test1')).toBe(JSON.stringify('hello'));

      const b = new sb.Persistent('test2', 123);
      b.set(456);
      expect(localStorage.getItem('test2')).toBe(JSON.stringify(456));

      const c = new sb.Persistent('test3', true);
      c.set(false);
      expect(localStorage.getItem('test3')).toBe(JSON.stringify(false));

      const d = new sb.Persistent('test4', {});
      d.set({ foo: 'bar' });
      expect(localStorage.getItem('test4')).toBe(
        JSON.stringify({ foo: 'bar' })
      );
    });

    test('remove', () => {
      expect(localStorage.getItem('test')).toBeNull();
      new sb.Persistent('test', 'hello').remove();
      expect(localStorage.getItem('test')).toBeNull();
    });
  });
});

describe('store-buddy Session class', () => {
  beforeEach(() => sessionStorage.clear());

  test('it stores to sessionStorage', () => {
    new sb.Session('foo', 'hello world');
    expect(sessionStorage.getItem('foo')).not.toBeNull();
  });

  test('it can store a value of every type', () => {
    expect(() => {
      new sb.Session('bar', 'hello');
      sessionStorage.getItem('bar');

      new sb.Session('bar', 123);
      sessionStorage.getItem('bar');

      new sb.Session('bar', true);
      sessionStorage.getItem('bar');

      new sb.Session('bar', {});
      sessionStorage.getItem('bar');
    }).not.toThrow();
  });

  describe('methods', () => {
    test('get', () => {
      expect(new sb.Session('test', 'hello').get()).toBe('hello');
      expect(new sb.Session('test', 123).get()).toBe(123);
      expect(new sb.Session('test', true).get()).toBe(true);
      expect(new sb.Session('test', {}).get()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(new sb.Session('test', obj).get()).toEqual(obj);

      const a = new sb.Session('test', 'hello');
      sessionStorage.removeItem('test');
      expect(a.get()).toBeNull();
    });

    test('set', () => {
      const a = new sb.Session('test1', '');
      a.set('hello');
      expect(sessionStorage.getItem('test1')).toBe(JSON.stringify('hello'));

      const b = new sb.Session('test2', 123);
      b.set(456);
      expect(sessionStorage.getItem('test2')).toBe(JSON.stringify(456));

      const c = new sb.Session('test3', true);
      c.set(false);
      expect(sessionStorage.getItem('test3')).toBe(JSON.stringify(false));

      const d = new sb.Session('test4', {});
      d.set({ foo: 'bar' });
      expect(sessionStorage.getItem('test4')).toBe(
        JSON.stringify({ foo: 'bar' })
      );
    });

    test('remove', () => {
      expect(sessionStorage.getItem('test')).toBeNull();
      new sb.Session('test', 'hello').remove();
      expect(sessionStorage.getItem('test')).toBeNull();
    });
  });
});
