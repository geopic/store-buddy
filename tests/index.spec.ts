import sb from 'store-buddy';

describe('store-buddy Persistent class', () => {
  beforeEach(() => localStorage.clear());

  test('it can store a value of every type', () => {
    expect(() => {
      const a = new sb.Persistent('', 'hello world');
      const b = new sb.Persistent('', 123);
      const c = new sb.Persistent('', true);
      const d = new sb.Persistent('', {});
    }).not.toThrow();
  });
});

describe('store-buddy sessionStorage tests', () => {});
