# store-buddy

**store-buddy** is a portable, type-safe and well-documented wrapper for [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

- Use _one_ reference to a stored item in localStorage or sessionStorage across your entire project!

- Ensure that the stored item's type and/or object structure is not changed, to prevent unexpected behaviour and bugs!

## Installation

```sh
npm install store-buddy
```

## Usage

```ts
import storeBuddy from 'store-buddy';

const data = storeBuddy('site-data', { foo: true });
data.load(); // returns object of type { foo: boolean; }

data.save({ foo: false }); // valid (argument type is same object)
data.save(123); // invalid (argument type is number)

data.clear(); // clear all data attributed to the key "site-data"

// Data lasts only as long as a single session, specified as so in the boolean third argument
const sessionData = storeBuddy('site-data-session', { foo: true }, true);
```

## Contributions & bug reports

All contibutions are welcome, such as ideas for additional features, fixing mistakes in the Readme & documentation, or an issue which details a bug that has been found. Please open an issue if you wish to contribute.

## License

MIT, [see license file](LICENSE) for details.
