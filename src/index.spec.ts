import storeBuddy from '../dist/index';

describe('store-buddy: localStorage', () => {
  beforeEach(() => localStorage.clear());

  describe('methods', () => {
    describe('init', () => {
      test('it stores to localStorage', () => {
        storeBuddy('foo').init('hello world');
        expect(localStorage.getItem('foo')).not.toBeNull();
      });

      test('it can store a value of every type', () => {
        expect(() => {
          storeBuddy<string>('bar').init('hello');
          localStorage.getItem('bar');

          storeBuddy<number>('bar').init(123);
          localStorage.getItem('bar');

          storeBuddy<boolean>('bar').init(true);
          localStorage.getItem('bar');

          storeBuddy<object>('bar').init({});
          localStorage.getItem('bar');
        }).not.toThrow();
      });
    });

    test('load', () => {
      expect(storeBuddy('test1').init('hello').load()).toBe('hello');

      expect(storeBuddy('test2').init(123).load()).toBe(123);

      expect(storeBuddy('test3').init(true).load()).toBe(true);

      expect(storeBuddy('test4').init({}).load()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(storeBuddy('test5').init(obj).load()).toEqual(obj);

      const a = storeBuddy('test6').init('hello');
      localStorage.removeItem('test6');
      expect(() => a.load()).toThrow();
    });

    test('save', () => {
      const a = storeBuddy('test1').init('hello');
      a.save('world');
      expect(JSON.parse(localStorage.getItem('test1') as string)).toBe('world');

      const b = storeBuddy<number>('test2').init(123);
      b.save(456);
      expect(JSON.parse(localStorage.getItem('test2') as string)).toBe(456);
    });

    test('reset', () => {
      const a = storeBuddy('test').init('hello');
      a.save('world');
      expect(JSON.parse(localStorage.getItem('test') as string)).toBe('world');
      a.reset();
      expect(JSON.parse(localStorage.getItem('test') as string)).toBe('hello');
    });

    test('clear', () => {
      expect(localStorage.getItem('test')).toBeNull();
      storeBuddy('test').init('hello').clear();
      expect(localStorage.getItem('test')).toBeNull();
    });
  });
});

describe('store-buddy: sessionStorage', () => {
  beforeEach(() => sessionStorage.clear());

  describe('methods', () => {
    describe('init', () => {
      test('it stores to sessionStorage', () => {
        storeBuddy('foo', true).init('hello world');
        expect(sessionStorage.getItem('foo')).not.toBeNull();
      });

      test('it can store a value of every type', () => {
        expect(() => {
          storeBuddy<string>('bar', true).init('hello');
          sessionStorage.getItem('bar');

          storeBuddy<number>('bar', true).init(123);
          sessionStorage.getItem('bar');

          storeBuddy<boolean>('bar', true).init(true);
          sessionStorage.getItem('bar');

          storeBuddy<object>('bar', true).init({});
          sessionStorage.getItem('bar');
        }).not.toThrow();
      });
    });

    test('load', () => {
      expect(storeBuddy('test1', true).init('hello').load()).toBe('hello');

      expect(storeBuddy('test2', true).init(123).load()).toBe(123);

      expect(storeBuddy('test3', true).init(true).load()).toBe(true);

      expect(storeBuddy('test4', true).init({}).load()).toEqual({});

      const obj = { foo: true, bar: 'baz' };
      expect(storeBuddy('test5', true).init(obj).load()).toEqual(obj);

      const a = storeBuddy('test6', true).init('hello');
      sessionStorage.removeItem('test6');
      expect(() => a.load()).toThrow();
    });

    test('save', () => {
      const a = storeBuddy('test1', true).init('hello');
      a.save('world');
      expect(JSON.parse(sessionStorage.getItem('test1') as string)).toBe(
        'world'
      );

      const b = storeBuddy<number>('test2', true).init(123);
      b.save(456);
      expect(JSON.parse(sessionStorage.getItem('test2') as string)).toBe(456);
    });

    test('reset', () => {
      const a = storeBuddy('test', true).init('hello');
      a.save('world');
      expect(JSON.parse(sessionStorage.getItem('test') as string)).toBe(
        'world'
      );
      a.reset();
      expect(JSON.parse(sessionStorage.getItem('test') as string)).toBe(
        'hello'
      );
    });

    test('clear', () => {
      expect(sessionStorage.getItem('test')).toBeNull();
      storeBuddy('test', true).init('hello').clear();
      expect(sessionStorage.getItem('test')).toBeNull();
    });
  });
});
